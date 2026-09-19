using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeTimesheet.Data;
using EmployeeTimesheet.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace EmployeeTimesheet.Infrastructure
{
    public class TempUserRepository : ITempUserRepository
    {
        private IdentityDataContext dbIdentity;
        private DailyMemoContext dbDM;
        private UserManager<IdentityUser> UserManager;
        public SignInManager<IdentityUser> SignInManager;
        public TempUserRepository(IdentityDataContext dbIdentity, DailyMemoContext dbDM, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager )
        {
            this.dbDM = dbDM;
            this.dbIdentity = dbIdentity;
            this.UserManager = userManager;
            this.SignInManager = signInManager;
        }

        public async Task CreateTempUserIdentityAsync()
        {
            var lastEmpId = dbDM.Employees.Select(e => e.EmpId).Max();
            lastEmpId = lastEmpId + 1;

            string tempUserName = "tempu" + lastEmpId.ToString();
            string tempUserPassword = tempUserName + "123";

            var tempUser = await UserManager.FindByNameAsync(tempUserName);
            if (tempUser != null) return;

            tempUser = new IdentityUser()
            {
                UserName = tempUserName,
            };

            // Add the user to the Db with the choosen password
            IdentityResult result = await UserManager.CreateAsync(tempUser, tempUserPassword);
            if (result.Succeeded)
            {
                var attemptTempUser = await UserManager.FindByNameAsync(tempUserName);
                if(attemptTempUser != null)
                {
                    await SignInManager.SignOutAsync();
                    SignInResult signInResult = await SignInManager.PasswordSignInAsync(tempUser, tempUserPassword, false, false);

                    if(signInResult.Succeeded)
                    {
                        SetupTempData(tempUserName);
                    }
                }

            }
        }

        public void SetupTempData(string tempUserName)
        {
            var tempEmployee = new Employee()
            {
                UserName = tempUserName,
                DepartmentId = 1,
                DepartmentDescr = "IT",
                FirstName = "Temp",
                MiddleInit = null,
                LastName = "User",
                StartTime = DateTime.Parse("9:00:00").TimeOfDay,
                Email = "temp9999@abc.com",
                WorkExt = "3125129999",
                DateModified = DateTime.Now
            };

            dbDM.Employees.Add(tempEmployee);
            dbDM.SaveChanges();

            var tempPreviousTimesheetHeader = new DailyMemoHeader()
            {
                EmpId = tempEmployee.EmpId,
                CreateDate = DateTime.Now.AddDays(-1).Date,
                HeaderDepartmentId = 1,
                WorkId = 1,
                Suggestions = "Temp Test suggestion1",
                Submitted = false,
                DateSubmitted = null,
                DateModified = DateTime.Now
            };
            dbDM.DailyMemoHeader.Add(tempPreviousTimesheetHeader);
            dbDM.SaveChanges();

            var tempPreviousTimesheetTransactions = new DailyMemoTransactions[]
            {
                new DailyMemoTransactions { DailyMemoHeaderId=tempPreviousTimesheetHeader.DailyMemoHeaderId, TransDepartmentId=1, TaskId=4, TaskType="Task", TaskDescr="Application support", DailyMemoQty1=1, DailyMemoMinutes1=60, DailyMemoQty2=1, DailyMemoMinutes2=45, DailyMemoQty3=1, DailyMemoMinutes3=60, DailyMemoQty4=null, DailyMemoMinutes4=null, DailyMemoQty5=null, DailyMemoMinutes5=null, DailyMemoQty6=null, DailyMemoMinutes6=null, DailyMemoQty7=null, DailyMemoMinutes7=null, DailyMemoQty8=null, DailyMemoMinutes8=null, DateModified=DateTime.Now},
                new DailyMemoTransactions { DailyMemoHeaderId=tempPreviousTimesheetHeader.DailyMemoHeaderId, TransDepartmentId=1, TaskId=null, TaskType="Break", TaskDescr="Break", DailyMemoQty1=null, DailyMemoMinutes1=null, DailyMemoQty2=1, DailyMemoMinutes2=15, DailyMemoQty3=null, DailyMemoMinutes3=null, DailyMemoQty4=null, DailyMemoMinutes4=null, DailyMemoQty5=null, DailyMemoMinutes5=null, DailyMemoQty6=null, DailyMemoMinutes6=null, DailyMemoQty7=null, DailyMemoMinutes7=null, DailyMemoQty8=null, DailyMemoMinutes8=null, DateModified=DateTime.Now},
                new DailyMemoTransactions { DailyMemoHeaderId=tempPreviousTimesheetHeader.DailyMemoHeaderId, TransDepartmentId=1, TaskId=null, TaskType="Lunch", TaskDescr="Lunch", DailyMemoQty1=null, DailyMemoMinutes1=null, DailyMemoQty2=null, DailyMemoMinutes2=null, DailyMemoQty3=null, DailyMemoMinutes3=null, DailyMemoQty4=1, DailyMemoMinutes4=60, DailyMemoQty5=null, DailyMemoMinutes5=null, DailyMemoQty6=null, DailyMemoMinutes6=null, DailyMemoQty7=null, DailyMemoMinutes7=null, DailyMemoQty8=null, DailyMemoMinutes8=null, DateModified=DateTime.Now},
                new DailyMemoTransactions { DailyMemoHeaderId=tempPreviousTimesheetHeader.DailyMemoHeaderId, TransDepartmentId=1, TaskId=1, TaskType="Task", TaskDescr="Rewrite functions in .NET", DailyMemoQty1=null, DailyMemoMinutes1=null, DailyMemoQty2=null, DailyMemoMinutes2=null, DailyMemoQty3=null, DailyMemoMinutes3= null, DailyMemoQty4=null, DailyMemoMinutes4=null, DailyMemoQty5=2, DailyMemoMinutes5=60, DailyMemoQty6=3, DailyMemoMinutes6=60, DailyMemoQty7=1, DailyMemoMinutes7=60, DailyMemoQty8=1, DailyMemoMinutes8=60, DateModified=DateTime.Now}
            };
            foreach(DailyMemoTransactions t in tempPreviousTimesheetTransactions)
            {
                dbDM.DailyMemoTransactions.Add(t);
            }
            dbDM.SaveChanges();

        }

        public async Task<bool> DeleteTempDataAsync(string userName)
        {
            bool isDeleted = false;

            Employee employee = await dbDM.Employees.Where(e => e.UserName == userName).FirstOrDefaultAsync();
            var dailyMemoHeaders = await dbDM.DailyMemoHeader.Where(e => e.EmpId == employee.EmpId).ToListAsync();

            dbDM.Entry(employee).State = EntityState.Deleted;
            await dbDM.SaveChangesAsync();

            foreach (var dailyMemoHeader in dailyMemoHeaders)
            {
                dbDM.Entry(dailyMemoHeader).State = EntityState.Deleted;
                await dbDM.SaveChangesAsync();
            }

            isDeleted = true;


            return isDeleted;
        }

        public async Task<bool> DeleteTempUser(string userName)
        {
            bool isDeleted = false;
            var tempUser = await UserManager.FindByNameAsync(userName);
            if (tempUser != null)
            {
                IdentityResult result = await UserManager.DeleteAsync(tempUser);
                if (result.Succeeded)
                {
                    isDeleted = true;
                };
            }

            return isDeleted;
        }
    }
}
