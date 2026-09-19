using EmployeeTimesheet.Models;
using EmployeeTimesheet.ViewModels;
using EmployeeTimesheet.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeTimesheet.Infrastructure
{
    public class DailyMemoRepository : IDailyMemoRepository
    {
        private DailyMemoContext db;
        public DailyMemoRepository(DailyMemoContext db)
        {
            this.db = db;
        }

        //Daily Memo calls
        public async Task<List<DailyMemoDates>> GetDailyMemoDatesAsync(int empId, DateTime startDate, DateTime endDate)
        {
            List<DailyMemoDates> dailyMemoDates = new List<DailyMemoDates>();
            List<DailyMemoHeader> dailyMemoHeaders = await db.DailyMemoHeader.Where(e => e.EmpId == empId && (e.CreateDate >= startDate && e.CreateDate <= endDate)).OrderByDescending(e => e.CreateDate).ToListAsync();
            foreach (var item in dailyMemoHeaders)
            {
                dailyMemoDates.Add(new DailyMemoDates
                {
                    DailyMemoHeaderId = item.DailyMemoHeaderId,
                    CreateDate = item.CreateDate.ToString("MM/dd/yyyy")
                });
            }
            return dailyMemoDates;
        }

        public async Task<int> GetDailyMemoHeaderIdAsync(int empId, DateTime createDate)
        {
            return await db.DailyMemoHeader.Where(d => d.EmpId == empId && d.CreateDate == createDate).Select(d => d.DailyMemoHeaderId).FirstOrDefaultAsync();
        }

        public async Task<DailyMemoSubmitted> IsDailyMemoSubmittedAsync(int dailyMemoHeaderId)
        {
            return await db.DailyMemoHeader.Where(d => d.DailyMemoHeaderId == dailyMemoHeaderId).Select(d => new DailyMemoSubmitted { Submitted = d.Submitted, DateSubmitted = d.DateSubmitted }).FirstOrDefaultAsync();
        }

        public async Task<DailyMemoIndividual> GetDailyMemoDetailsAsync(int? id)
        {
            DailyMemoHeader dailyMemoHeader = await db.DailyMemoHeader.FindAsync(id);
            var model = new DailyMemoIndividual();
            model.DailyMemoHeader = dailyMemoHeader;
            model.DailyMemoTransactions = await db.DailyMemoTransactions.Where(d => d.DailyMemoHeaderId == id).OrderBy(o => o.DailyMemoTransId).ToArrayAsync();

            return model;
        }

        public async Task CreateDailyMemoAsync(EmployeeData employeeData, int dailyMemoHeaderId)
        {
            //create inital daily memo
            int workId = await db.WorkingHours.Where(w => w.StartTime == employeeData.StartTime).Select(w => w.WorkId).FirstOrDefaultAsync();

            //default to 9:00am if start time is null in HR
            if (workId == 0)
            {
                workId = 3;
            }

            DailyMemoHeader createInitialDailyMemo = new DailyMemoHeader();
            createInitialDailyMemo.EmpId = employeeData.EmpId;
            createInitialDailyMemo.CreateDate = DateTime.Today;
            createInitialDailyMemo.HeaderDepartmentId = employeeData.DepartmentId;
            createInitialDailyMemo.WorkId = workId;
            createInitialDailyMemo.Suggestions = null;
            createInitialDailyMemo.Submitted = false;
            createInitialDailyMemo.DateSubmitted = null;
            createInitialDailyMemo.DateModified = DateTime.Now;
            db.DailyMemoHeader.Add(createInitialDailyMemo);
            await db.SaveChangesAsync();

            int taskId = await db.Tasks.Where(t => t.DepartmentId == employeeData.DepartmentId && t.TaskDescr == " Free-form Text").Select(t => t.DepartmentId).FirstOrDefaultAsync();
            dailyMemoHeaderId = createInitialDailyMemo.DailyMemoHeaderId;

            DailyMemoTransactions taskDailyMemoTransactions = new DailyMemoTransactions();
            taskDailyMemoTransactions.DailyMemoHeaderId = dailyMemoHeaderId;
            taskDailyMemoTransactions.TransDepartmentId = employeeData.DepartmentId;
            taskDailyMemoTransactions.TaskId = taskId;
            taskDailyMemoTransactions.TaskType = "Task";
            taskDailyMemoTransactions.TaskDescr = null;
            taskDailyMemoTransactions.DailyMemoQty1 = null;
            taskDailyMemoTransactions.DailyMemoMinutes1 = null;
            taskDailyMemoTransactions.DailyMemoQty2 = null;
            taskDailyMemoTransactions.DailyMemoMinutes2 = null;
            taskDailyMemoTransactions.DailyMemoQty3 = null;
            taskDailyMemoTransactions.DailyMemoMinutes3 = null;
            taskDailyMemoTransactions.DailyMemoQty4 = null;
            taskDailyMemoTransactions.DailyMemoMinutes4 = null;
            taskDailyMemoTransactions.DailyMemoQty5 = null;
            taskDailyMemoTransactions.DailyMemoMinutes5 = null;
            taskDailyMemoTransactions.DailyMemoQty6 = null;
            taskDailyMemoTransactions.DailyMemoMinutes6 = null;
            taskDailyMemoTransactions.DailyMemoQty7 = null;
            taskDailyMemoTransactions.DailyMemoMinutes7 = null;
            taskDailyMemoTransactions.DailyMemoQty8 = null;
            taskDailyMemoTransactions.DailyMemoMinutes8 = null;
            taskDailyMemoTransactions.DateModified = DateTime.Now;

            DailyMemoTransactions breakDailyMemoTransactions = new DailyMemoTransactions();
            breakDailyMemoTransactions.DailyMemoHeaderId = dailyMemoHeaderId;
            breakDailyMemoTransactions.TransDepartmentId = employeeData.DepartmentId;
            breakDailyMemoTransactions.TaskId = null;
            breakDailyMemoTransactions.TaskType = "Break";
            breakDailyMemoTransactions.TaskDescr = "Break";
            breakDailyMemoTransactions.DailyMemoQty1 = null;
            breakDailyMemoTransactions.DailyMemoMinutes1 = null;
            breakDailyMemoTransactions.DailyMemoQty2 = null;
            breakDailyMemoTransactions.DailyMemoMinutes2 = null;
            breakDailyMemoTransactions.DailyMemoQty3 = null;
            breakDailyMemoTransactions.DailyMemoMinutes3 = null;
            breakDailyMemoTransactions.DailyMemoQty4 = null;
            breakDailyMemoTransactions.DailyMemoMinutes4 = null;
            breakDailyMemoTransactions.DailyMemoQty5 = null;
            breakDailyMemoTransactions.DailyMemoMinutes5 = null;
            breakDailyMemoTransactions.DailyMemoQty6 = null;
            breakDailyMemoTransactions.DailyMemoMinutes6 = null;
            breakDailyMemoTransactions.DailyMemoQty7 = null;
            breakDailyMemoTransactions.DailyMemoMinutes7 = null;
            breakDailyMemoTransactions.DailyMemoQty8 = null;
            breakDailyMemoTransactions.DailyMemoMinutes8 = null;
            breakDailyMemoTransactions.DateModified = DateTime.Now;

            DailyMemoTransactions lunchDailyMemoTransactions = new DailyMemoTransactions();
            lunchDailyMemoTransactions.DailyMemoHeaderId = dailyMemoHeaderId;
            lunchDailyMemoTransactions.TransDepartmentId = employeeData.DepartmentId;
            lunchDailyMemoTransactions.TaskId = null;
            lunchDailyMemoTransactions.TaskType = "Lunch";
            lunchDailyMemoTransactions.TaskDescr = "Lunch";
            lunchDailyMemoTransactions.DailyMemoQty1 = null;
            lunchDailyMemoTransactions.DailyMemoMinutes1 = null;
            lunchDailyMemoTransactions.DailyMemoQty2 = null;
            lunchDailyMemoTransactions.DailyMemoMinutes2 = null;
            lunchDailyMemoTransactions.DailyMemoQty3 = null;
            lunchDailyMemoTransactions.DailyMemoMinutes3 = null;
            lunchDailyMemoTransactions.DailyMemoQty4 = null;
            lunchDailyMemoTransactions.DailyMemoMinutes4 = null;
            lunchDailyMemoTransactions.DailyMemoQty5 = null;
            lunchDailyMemoTransactions.DailyMemoMinutes5 = null;
            lunchDailyMemoTransactions.DailyMemoQty6 = null;
            lunchDailyMemoTransactions.DailyMemoMinutes6 = null;
            lunchDailyMemoTransactions.DailyMemoQty7 = null;
            lunchDailyMemoTransactions.DailyMemoMinutes7 = null;
            lunchDailyMemoTransactions.DailyMemoQty8 = null;
            lunchDailyMemoTransactions.DailyMemoMinutes8 = null;
            lunchDailyMemoTransactions.DateModified = DateTime.Now;

            // make sure in order with seperate saves
            db.DailyMemoTransactions.Add(taskDailyMemoTransactions);
            await db.SaveChangesAsync();

            db.DailyMemoTransactions.Add(breakDailyMemoTransactions);
            await db.SaveChangesAsync();

            db.DailyMemoTransactions.Add(lunchDailyMemoTransactions);
            await db.SaveChangesAsync();

        }

        public async Task EditDailyMemoAsync(DailyMemoIndividual dailyMemoIndividual)
        {
            DailyMemoHeader dailyMemoHeader = await db.DailyMemoHeader.FindAsync(dailyMemoIndividual.DailyMemoHeader.DailyMemoHeaderId);

            dailyMemoHeader.DateModified = DateTime.Now;
            dailyMemoHeader.WorkId = dailyMemoIndividual.DailyMemoHeader.WorkId;
            dailyMemoHeader.Suggestions = dailyMemoIndividual.DailyMemoHeader.Suggestions;
            dailyMemoHeader.Submitted = dailyMemoIndividual.DailyMemoHeader.Submitted;
            dailyMemoHeader.DateSubmitted = dailyMemoIndividual.DailyMemoHeader.DateSubmitted;

            db.Entry(dailyMemoHeader).State = EntityState.Modified;

            var dailyMemoTransactions = await db.DailyMemoTransactions.AsNoTracking().Where(d => d.DailyMemoHeaderId == dailyMemoIndividual.DailyMemoHeader.DailyMemoHeaderId).OrderBy(o => o.DailyMemoTransId).ToListAsync();
            ArrayList newtransIDList = new ArrayList();

            foreach (var transaction in dailyMemoIndividual.DailyMemoTransactions)
            {
                newtransIDList.Add(transaction.DailyMemoTransId);

                foreach (var existtransaction in dailyMemoTransactions)
                {
                    if (transaction.DailyMemoTransId == existtransaction.DailyMemoTransId)
                    {
                        transaction.DailyMemoHeaderId = dailyMemoIndividual.DailyMemoHeader.DailyMemoHeaderId;
                        transaction.DateModified = DateTime.Now;
                        db.Entry(transaction).State = EntityState.Modified;
                        await db.SaveChangesAsync();
                    }

                    else if (transaction.DailyMemoTransId == 0)
                    {
                        transaction.DailyMemoHeaderId = dailyMemoIndividual.DailyMemoHeader.DailyMemoHeaderId;
                        transaction.DateModified = DateTime.Now;
                        db.DailyMemoTransactions.Add(transaction);
                        await db.SaveChangesAsync();
                    }

                }
            }

            //make sure order with seperate saves
            foreach (var existtransaction in dailyMemoTransactions)
            {
                if (!newtransIDList.Contains(existtransaction.DailyMemoTransId))
                {
                    var deleteTransaction = dailyMemoTransactions.Where(d => d.DailyMemoTransId == existtransaction.DailyMemoTransId).FirstOrDefault();
                    db.DailyMemoTransactions.Attach(deleteTransaction);
                    db.Entry(deleteTransaction).State = EntityState.Deleted;
                    await db.SaveChangesAsync();
                }
            }
        }

        public async Task ReplaceDailyMemoAsync(int replaceDailyMemoHeaderId, int empId, string userName, DateTime createDate)
        {

            DailyMemoHeader replaceDailyMemoHeader = await db.DailyMemoHeader.FindAsync(replaceDailyMemoHeaderId);
            var replaceDailyMemoTransactions = await db.DailyMemoTransactions.Where(d => d.DailyMemoHeaderId == replaceDailyMemoHeader.DailyMemoHeaderId).OrderBy(o => o.DailyMemoTransId).ToListAsync();

            DailyMemoHeader currentDailyMemoHeader = await db.DailyMemoHeader.Where(d => d.EmpId == empId && d.CreateDate == createDate).FirstOrDefaultAsync();

            currentDailyMemoHeader.DateModified = DateTime.Now;
            currentDailyMemoHeader.WorkId = replaceDailyMemoHeader.WorkId;
            currentDailyMemoHeader.Suggestions = replaceDailyMemoHeader.Suggestions;
            currentDailyMemoHeader.Submitted = false;
            currentDailyMemoHeader.DateSubmitted = null;
            currentDailyMemoHeader.HeaderDepartmentId = replaceDailyMemoHeader.HeaderDepartmentId;

            db.Entry(currentDailyMemoHeader).State = EntityState.Modified;

            var currentDailyMemoTransactions = await db.DailyMemoTransactions.Where(d => d.DailyMemoHeaderId == currentDailyMemoHeader.DailyMemoHeaderId).ToListAsync();

            foreach (var transaction in currentDailyMemoTransactions)
            {
                db.DailyMemoTransactions.Remove(transaction);
            }

            foreach (var transaction in replaceDailyMemoTransactions)
            {
                var newtransaction = new DailyMemoTransactions();
                newtransaction.TaskDescr = transaction.TaskDescr;
                newtransaction.TaskId = transaction.TaskId;
                newtransaction.TaskType = transaction.TaskType;
                newtransaction.TransDepartmentId = transaction.TransDepartmentId;
                newtransaction.DailyMemoHeaderId = currentDailyMemoHeader.DailyMemoHeaderId;
                newtransaction.DailyMemoQty1 = null;
                newtransaction.DailyMemoMinutes1 = null;
                newtransaction.DailyMemoQty2 = null;
                newtransaction.DailyMemoMinutes2 = null;
                newtransaction.DailyMemoQty3 = null;
                newtransaction.DailyMemoMinutes3 = null;
                newtransaction.DailyMemoQty4 = null;
                newtransaction.DailyMemoMinutes4 = null;
                newtransaction.DailyMemoQty5 = null;
                newtransaction.DailyMemoMinutes5 = null;
                newtransaction.DailyMemoQty6 = null;
                newtransaction.DailyMemoMinutes6 = null;
                newtransaction.DailyMemoQty7 = null;
                newtransaction.DailyMemoMinutes7 = null;
                newtransaction.DailyMemoQty8 = null;
                newtransaction.DailyMemoMinutes8 = null;
                newtransaction.DateModified = DateTime.Now;
                db.DailyMemoTransactions.Add(newtransaction);
                //make sure save in order with seperate saves
                await db.SaveChangesAsync();
            }
        }

        //Employee calls
        public async Task<EmployeeData> SelectByEmpIDAsync(string userName)
        {
            return await db.Employees.Where(e => e.UserName == userName).Select(e => new EmployeeData { EmpId = e.EmpId, UserName = e.UserName, DepartmentId = e.DepartmentId, FirstName = e.FirstName, LastName = e.LastName, StartTime = e.StartTime }).FirstOrDefaultAsync();
        }

        public async Task<int> SelectEmpIDAsync(string userName)
        {
            return await db.Employees.Where(e => e.UserName == userName).Select(e => e.EmpId).FirstOrDefaultAsync();
        }

        public async Task<string> SelectEmpNameAsync(string userName)
        {
            return await db.Employees.Where(e => e.UserName == userName).Select(e => e.FirstName + ' ' + e.LastName).FirstOrDefaultAsync();
        }

        public async Task CreateEmployeeAsync(EmployeeData employeeData)
        {
            var departmentName = await db.Departments.Where(d => d.DepartmentId == employeeData.DepartmentId).Select(d => d.DepartmentDesc).FirstOrDefaultAsync();

            Employee employee = new Employee();
            employee.DateModified = DateTime.Now;
            employee.DepartmentDescr = departmentName;
            employee.DepartmentId = employeeData.DepartmentId;
            employee.Email = employeeData.Email;
            employee.FirstName = employeeData.FirstName;
            employee.LastName = employeeData.LastName;
            employee.MiddleInit = null;
            employee.StartTime = employeeData.StartTime;
            employee.UserName = employeeData.UserName;
            employee.WorkExt = employeeData.WorkExt;

            db.Employees.Add(employee);

            await db.SaveChangesAsync();

        }

        //Department calls
        public async Task<List<Departments>> GetDepartmentsAsync()
        {
            return await db.Departments.ToListAsync();
        }

        //Working Hours calls

        public async Task<WorkingHours> GetWorkingHoursByIdAsync(int? workId)
        {
            return await db.WorkingHours.Where(d => d.WorkId == workId).FirstOrDefaultAsync();
        }

        public async Task<List<WorkingHours>> GetWorkingHoursAsync()
        {
            return await db.WorkingHours.ToListAsync();
        }

        //Task calls
        public async Task<List<Tasks>> GetTasksByDepartmentAsync(int departId)
        {
            return await db.Tasks.Where(d => d.DepartmentId == departId).ToListAsync();
        }

    }
}