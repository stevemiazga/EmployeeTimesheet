using EmployeeTimesheet.Models;
using System;
using System.Linq;

namespace EmployeeTimesheet.Data
{
    public static class DbInitializer
    {
        public static void Initialize(DailyMemoContext context)
        {
            context.Database.EnsureCreated();

            if (context.DailyMemoHeader.Any())
            {
                return;
            }

            var workingHours = new WorkingHours[]
            {
                new WorkingHours { StartTime=DateTime.Parse("9:00:00").TimeOfDay, WorkHours="09:00am - 05:00pm (480 Minutes)", WorkHours1="9am - 10am", WorkHours2="10am - 11am", WorkHours3="11am - 12pm", WorkHours4="12pm - 1pm", WorkHours5="1pm - 2pm", WorkHours6="2pm - 3pm", WorkHours7="3pm - 4pm", WorkHours8="4pm - 5pm" ,TotMins=480},
                new WorkingHours { StartTime=DateTime.Parse("7:00:00").TimeOfDay, WorkHours="07:00am - 03:00pm (480 Minutes)", WorkHours1="7am - 8am", WorkHours2="8am - 9am", WorkHours3="9am - 10am", WorkHours4="10am - 11am", WorkHours5="11am - 12pm", WorkHours6="12pm - 1pm", WorkHours7="1pm - 2pm", WorkHours8="2pm - 3pm" ,TotMins=480},
                new WorkingHours { StartTime=DateTime.Parse("8:00:00").TimeOfDay, WorkHours="08:00am - 04:00pm (480 Minutes)", WorkHours1="8am - 9am", WorkHours2="9am - 10am", WorkHours3="10am - 11am", WorkHours4="11am - 12pm", WorkHours5="12pm - 1pm", WorkHours6="1pm - 2pm", WorkHours7="2pm - 3pm", WorkHours8="3pm - 4pm" ,TotMins=480},
                new WorkingHours { StartTime=DateTime.Parse("7:30:00").TimeOfDay, WorkHours="07:30am - 03:30pm (480 Minutes)", WorkHours1="7:30am - 8:30am", WorkHours2="8:30am - 9:30am", WorkHours3="9:30am - 10:30am", WorkHours4="10:30am - 11:30am", WorkHours5="11:30am - 12:30pm", WorkHours6="12:30pm - 1:30pm", WorkHours7="1:30pm - 2:30pm", WorkHours8="2:30pm - 3:30pm" ,TotMins=480},
                new WorkingHours { StartTime=DateTime.Parse("8:30:00").TimeOfDay, WorkHours="08:30am - 04:30pm (480 Minutes)", WorkHours1="8:30am - 9:30am", WorkHours2="9:30am - 10:30am", WorkHours3="10:30am - 11:30am", WorkHours4="11:30am - 12:30pm", WorkHours5="12:30pm - 1:30pm", WorkHours6="1:30pm - 2:30pm", WorkHours7="2:30pm - 3:30pm", WorkHours8="3:30pm - 4:30pm" ,TotMins=480},
                new WorkingHours { StartTime=DateTime.Parse("11:00:00").TimeOfDay, WorkHours="11:00am - 03:00pm (240 Minutes)", WorkHours1="t", WorkHours2="t", WorkHours3="t", WorkHours4="t", WorkHours5="11am - 12pm", WorkHours6="12pm - 1pm", WorkHours7="1pm - 2pm", WorkHours8="2pm - 3pm", TotMins=240},
                new WorkingHours { StartTime=DateTime.Parse("12:00:00").TimeOfDay, WorkHours="12:00pm - 04:00pm (240 Minutes)", WorkHours1="t", WorkHours2="t", WorkHours3="t", WorkHours4="t", WorkHours5="12pm - 1pm", WorkHours6="1pm - 2pm", WorkHours7="2pm - 3pm", WorkHours8="3pm - 4pm", TotMins=240}
            };

            foreach (WorkingHours w in workingHours)
            {
                context.WorkingHours.Add(w);
            }

            context.SaveChanges();

            var departments = new Departments[]
            {
                new Departments { DepartmentDesc= "IT"},
                new Departments { DepartmentDesc= "Sales"},
                new Departments { DepartmentDesc= "Accounting"}

            };

            foreach (Departments d in departments)
            {
                context.Departments.Add(d);
            }

            context.SaveChanges();

            var tasks = new Tasks[]
            {
                new Tasks { TaskDescr=" Free-form Text", DepartmentId=1},
                new Tasks { TaskDescr="Server support", DepartmentId=1},
                new Tasks { TaskDescr="Set up server", DepartmentId=1},
                new Tasks { TaskDescr="Application support", DepartmentId=1},
                new Tasks { TaskDescr="Code application", DepartmentId=1},
                new Tasks { TaskDescr=" Free-form Text", DepartmentId=2},
                new Tasks { TaskDescr="Make sales call", DepartmentId=2},
                new Tasks { TaskDescr="Prepare sales report", DepartmentId=2},
                new Tasks { TaskDescr="Attend sales meeting", DepartmentId=2},
                new Tasks { TaskDescr="Visit customer", DepartmentId=2},
                new Tasks { TaskDescr=" Free-form Text", DepartmentId=3},
                new Tasks { TaskDescr="Balance accounts", DepartmentId=3},
                new Tasks { TaskDescr="Prepare financial report", DepartmentId=3},
                new Tasks { TaskDescr="Pay invoices", DepartmentId=3},
                new Tasks { TaskDescr="Prepare customer invoices", DepartmentId=3}

            };

            foreach (Tasks t in tasks)
            {
                context.Tasks.Add(t);
            }

            context.SaveChanges();

            var employees = new Employee[]
            {
                new Employee { UserName="tempu", DepartmentId=1, DepartmentDescr="IT", FirstName="User", MiddleInit=null, LastName="Temp", StartTime=DateTime.Parse("9:00:00").TimeOfDay, Email="temp@abc.com", WorkExt="3125126324", DateModified=DateTime.Now},
                new Employee { UserName="miazgas", DepartmentId=1, DepartmentDescr="IT", FirstName="Steve", MiddleInit="M", LastName="Miazga", StartTime=DateTime.Parse("9:00:00").TimeOfDay, Email="smiazga@sbcgloabl.net", WorkExt="3125128324", DateModified=DateTime.Now},
                new Employee { UserName="smithj", DepartmentId=2, DepartmentDescr="Sales", FirstName="John", MiddleInit=null, LastName="Smith", StartTime=DateTime.Parse("7:00:00").TimeOfDay, Email="jsmith@abc.com", WorkExt="3125127100", DateModified=DateTime.Now},
                new Employee { UserName="johnsonm", DepartmentId=3, DepartmentDescr="Accounting", FirstName="Micheal", MiddleInit=null, LastName="Johnson", StartTime=DateTime.Parse("8:00:00").TimeOfDay, Email="mjohnson@abc.com", WorkExt="3125127200", DateModified=DateTime.Now}
            };

            foreach (Employee e in employees)
            {
                context.Employees.Add(e);
            }

            context.SaveChanges();

            var timesheetHeaders = new DailyMemoHeader[]
            {
                new DailyMemoHeader { EmpId= employees.Single(e => e.UserName=="tempu").EmpId, CreateDate=DateTime.Now.Date, HeaderDepartmentId=1, WorkId=1, Suggestions="Temp Test suggestion1", Submitted=false, DateSubmitted=null, DateModified=DateTime.Now },
                new DailyMemoHeader { EmpId= employees.Single(e => e.UserName=="miazgas").EmpId, CreateDate=DateTime.Now.Date, HeaderDepartmentId=1, WorkId=1, Suggestions="Steve Test suggestion1", Submitted=false, DateSubmitted=null, DateModified=DateTime.Now },
                new DailyMemoHeader { EmpId= employees.Single(e => e.UserName=="smithj").EmpId, CreateDate=DateTime.Now.Date, HeaderDepartmentId=2, WorkId=2, Suggestions="John Test suggestion1", Submitted=false, DateSubmitted=null, DateModified=DateTime.Now },
                new DailyMemoHeader { EmpId= employees.Single(e => e.UserName=="johnsonm").EmpId, CreateDate=DateTime.Now.Date, HeaderDepartmentId=3, WorkId=3, Suggestions="Mike Test suggestion1", Submitted=false, DateSubmitted=null ,DateModified=DateTime.Now }
            };

            foreach (DailyMemoHeader t in timesheetHeaders)
            {
                context.DailyMemoHeader.Add(t);
            }

            context.SaveChanges();

            var timesheetTransactions = new DailyMemoTransactions[]
            {
                new DailyMemoTransactions { DailyMemoHeaderId=timesheetHeaders.Single(t => t.EmpId == 1).DailyMemoHeaderId, TransDepartmentId=1, TaskId=4, TaskType="Task", TaskDescr="Application support", DailyMemoQty1=1, DailyMemoMinutes1=60, DailyMemoQty2=1, DailyMemoMinutes2=45, DailyMemoQty3=1, DailyMemoMinutes3=60, DailyMemoQty4=null, DailyMemoMinutes4=null, DailyMemoQty5=null, DailyMemoMinutes5=null, DailyMemoQty6=null, DailyMemoMinutes6=null, DailyMemoQty7=null, DailyMemoMinutes7=null, DailyMemoQty8=null, DailyMemoMinutes8=null, DateModified=DateTime.Now},
                new DailyMemoTransactions { DailyMemoHeaderId=timesheetHeaders.Single(t => t.EmpId == 1).DailyMemoHeaderId, TransDepartmentId=1, TaskId=null, TaskType="Break", TaskDescr="Break", DailyMemoQty1=null, DailyMemoMinutes1=null, DailyMemoQty2=1, DailyMemoMinutes2=15, DailyMemoQty3=null, DailyMemoMinutes3=null, DailyMemoQty4=null, DailyMemoMinutes4=null, DailyMemoQty5=null, DailyMemoMinutes5=null, DailyMemoQty6=null, DailyMemoMinutes6=null, DailyMemoQty7=null, DailyMemoMinutes7=null, DailyMemoQty8=null, DailyMemoMinutes8=null, DateModified=DateTime.Now},
                new DailyMemoTransactions { DailyMemoHeaderId=timesheetHeaders.Single(t => t.EmpId == 1).DailyMemoHeaderId, TransDepartmentId=1, TaskId=null, TaskType="Lunch", TaskDescr="Lunch", DailyMemoQty1=null, DailyMemoMinutes1=null, DailyMemoQty2=null, DailyMemoMinutes2=null, DailyMemoQty3=null, DailyMemoMinutes3=null, DailyMemoQty4=1, DailyMemoMinutes4=60, DailyMemoQty5=null, DailyMemoMinutes5=null, DailyMemoQty6=null, DailyMemoMinutes6=null, DailyMemoQty7=null, DailyMemoMinutes7=null, DailyMemoQty8=null, DailyMemoMinutes8=null, DateModified=DateTime.Now},
                new DailyMemoTransactions { DailyMemoHeaderId=timesheetHeaders.Single(t => t.EmpId == 1).DailyMemoHeaderId, TransDepartmentId=1, TaskId=1, TaskType="Task", TaskDescr="Rewrite functions in .NET", DailyMemoQty1=null, DailyMemoMinutes1=null, DailyMemoQty2=null, DailyMemoMinutes2=null, DailyMemoQty3=null, DailyMemoMinutes3= null, DailyMemoQty4=null, DailyMemoMinutes4=null, DailyMemoQty5=2, DailyMemoMinutes5=60, DailyMemoQty6=3, DailyMemoMinutes6=60, DailyMemoQty7=1, DailyMemoMinutes7=60, DailyMemoQty8=1, DailyMemoMinutes8=60, DateModified=DateTime.Now},
                new DailyMemoTransactions { DailyMemoHeaderId=timesheetHeaders.Single(t => t.EmpId == 2).DailyMemoHeaderId, TransDepartmentId=1, TaskId=4, TaskType="Task", TaskDescr="Application support", DailyMemoQty1=1, DailyMemoMinutes1=60, DailyMemoQty2=1, DailyMemoMinutes2=45, DailyMemoQty3=1, DailyMemoMinutes3=60, DailyMemoQty4=null, DailyMemoMinutes4=null, DailyMemoQty5=null, DailyMemoMinutes5=null, DailyMemoQty6=null, DailyMemoMinutes6=null, DailyMemoQty7=null, DailyMemoMinutes7=null, DailyMemoQty8=null, DailyMemoMinutes8=null, DateModified=DateTime.Now},
                new DailyMemoTransactions { DailyMemoHeaderId=timesheetHeaders.Single(t => t.EmpId == 2).DailyMemoHeaderId, TransDepartmentId=1, TaskId=null, TaskType="Break", TaskDescr="Break", DailyMemoQty1=null, DailyMemoMinutes1=null, DailyMemoQty2=1, DailyMemoMinutes2=15, DailyMemoQty3=null, DailyMemoMinutes3=null, DailyMemoQty4=null, DailyMemoMinutes4=null, DailyMemoQty5=null, DailyMemoMinutes5=null, DailyMemoQty6=null, DailyMemoMinutes6=null, DailyMemoQty7=null, DailyMemoMinutes7=null, DailyMemoQty8=null, DailyMemoMinutes8=null, DateModified=DateTime.Now},
                new DailyMemoTransactions { DailyMemoHeaderId=timesheetHeaders.Single(t => t.EmpId == 2).DailyMemoHeaderId, TransDepartmentId=1, TaskId=null, TaskType="Lunch", TaskDescr="Lunch", DailyMemoQty1=null, DailyMemoMinutes1=null, DailyMemoQty2=null, DailyMemoMinutes2=null, DailyMemoQty3=null, DailyMemoMinutes3=null, DailyMemoQty4=1, DailyMemoMinutes4=60, DailyMemoQty5=null, DailyMemoMinutes5=null, DailyMemoQty6=null, DailyMemoMinutes6=null, DailyMemoQty7=null, DailyMemoMinutes7=null, DailyMemoQty8=null, DailyMemoMinutes8=null, DateModified=DateTime.Now},
                new DailyMemoTransactions { DailyMemoHeaderId=timesheetHeaders.Single(t => t.EmpId == 2).DailyMemoHeaderId, TransDepartmentId=1, TaskId=1, TaskType="Task", TaskDescr="Rewrite functions in .NET", DailyMemoQty1=null, DailyMemoMinutes1=null, DailyMemoQty2=null, DailyMemoMinutes2=null, DailyMemoQty3=null, DailyMemoMinutes3= null, DailyMemoQty4=null, DailyMemoMinutes4=null, DailyMemoQty5=2, DailyMemoMinutes5=60, DailyMemoQty6=3, DailyMemoMinutes6=60, DailyMemoQty7=1, DailyMemoMinutes7=60, DailyMemoQty8=1, DailyMemoMinutes8=60, DateModified=DateTime.Now},
                new DailyMemoTransactions { DailyMemoHeaderId=timesheetHeaders.Single(t => t.EmpId == 3).DailyMemoHeaderId, TransDepartmentId=2, TaskId=7, TaskType="Task", TaskDescr="Make sales call", DailyMemoQty1=15, DailyMemoMinutes1=60, DailyMemoQty2=11, DailyMemoMinutes2=45, DailyMemoQty3=20, DailyMemoMinutes3=60, DailyMemoQty4=null, DailyMemoMinutes4=null, DailyMemoQty5=null, DailyMemoMinutes5=null, DailyMemoQty6=null, DailyMemoMinutes6=null, DailyMemoQty7=null, DailyMemoMinutes7=null, DailyMemoQty8=null, DailyMemoMinutes8=null, DateModified=DateTime.Now},
                new DailyMemoTransactions { DailyMemoHeaderId=timesheetHeaders.Single(t => t.EmpId == 3).DailyMemoHeaderId, TransDepartmentId=1, TaskId=null, TaskType="Break", TaskDescr="Break", DailyMemoQty1=null, DailyMemoMinutes1=null, DailyMemoQty2=1, DailyMemoMinutes2=15, DailyMemoQty3=null, DailyMemoMinutes3=null, DailyMemoQty4=null, DailyMemoMinutes4=null, DailyMemoQty5=null, DailyMemoMinutes5=null, DailyMemoQty6=null, DailyMemoMinutes6=null, DailyMemoQty7=null, DailyMemoMinutes7=null, DailyMemoQty8=null, DailyMemoMinutes8=null, DateModified=DateTime.Now},
                new DailyMemoTransactions { DailyMemoHeaderId=timesheetHeaders.Single(t => t.EmpId == 3).DailyMemoHeaderId, TransDepartmentId=1, TaskId=null, TaskType="Lunch", TaskDescr="Lunch", DailyMemoQty1=null, DailyMemoMinutes1=null, DailyMemoQty2=null, DailyMemoMinutes2=null, DailyMemoQty3=null, DailyMemoMinutes3=null, DailyMemoQty4=1, DailyMemoMinutes4=60, DailyMemoQty5=null, DailyMemoMinutes5=null, DailyMemoQty6=null, DailyMemoMinutes6=null, DailyMemoQty7=null, DailyMemoMinutes7=null, DailyMemoQty8=null, DailyMemoMinutes8=null, DateModified=DateTime.Now},
                new DailyMemoTransactions { DailyMemoHeaderId=timesheetHeaders.Single(t => t.EmpId == 3).DailyMemoHeaderId, TransDepartmentId=3, TaskId=15, TaskType="Task", TaskDescr="Prepare customer invoices", DailyMemoQty1=null, DailyMemoMinutes1=null, DailyMemoQty2=null, DailyMemoMinutes2=null, DailyMemoQty3=null, DailyMemoMinutes3=null, DailyMemoQty4=null, DailyMemoMinutes4=null, DailyMemoQty5=5, DailyMemoMinutes5=60, DailyMemoQty6=4, DailyMemoMinutes6=60, DailyMemoQty7=1, DailyMemoMinutes7=60, DailyMemoQty8=1, DailyMemoMinutes8=60, DateModified=DateTime.Now},
                new DailyMemoTransactions { DailyMemoHeaderId=timesheetHeaders.Single(t => t.EmpId == 4).DailyMemoHeaderId, TransDepartmentId=3, TaskId=12, TaskType="Task", TaskDescr="Balance Accounts", DailyMemoQty1=13, DailyMemoMinutes1=45, DailyMemoQty2=18, DailyMemoMinutes2=60, DailyMemoQty3=20, DailyMemoMinutes3=60, DailyMemoQty4=null, DailyMemoMinutes4=null, DailyMemoQty5=null, DailyMemoMinutes5=null, DailyMemoQty6=null, DailyMemoMinutes6=null, DailyMemoQty7=null, DailyMemoMinutes7=null, DailyMemoQty8=null, DailyMemoMinutes8=null, DateModified=DateTime.Now},
                new DailyMemoTransactions { DailyMemoHeaderId=timesheetHeaders.Single(t => t.EmpId == 4).DailyMemoHeaderId, TransDepartmentId=3, TaskId=null, TaskType="Break", TaskDescr="Break", DailyMemoQty1=1, DailyMemoMinutes1=15, DailyMemoQty2=null, DailyMemoMinutes2=null, DailyMemoQty3=null, DailyMemoMinutes3=null, DailyMemoQty4=null, DailyMemoMinutes4=null, DailyMemoQty5=null, DailyMemoMinutes5=null, DailyMemoQty6=null, DailyMemoMinutes6=null, DailyMemoQty7=null, DailyMemoMinutes7=null, DailyMemoQty8=null, DailyMemoMinutes8=null, DateModified=DateTime.Now},
                new DailyMemoTransactions { DailyMemoHeaderId=timesheetHeaders.Single(t => t.EmpId == 4).DailyMemoHeaderId, TransDepartmentId=3, TaskId=null, TaskType="Lunch", TaskDescr="Lunch", DailyMemoQty1=null, DailyMemoMinutes1=null, DailyMemoQty2=null, DailyMemoMinutes2=null, DailyMemoQty3=null, DailyMemoMinutes3=null, DailyMemoQty4=null, DailyMemoMinutes4=null, DailyMemoQty5=1, DailyMemoMinutes5=60, DailyMemoQty6=null, DailyMemoMinutes6=null, DailyMemoQty7=null, DailyMemoMinutes7=null, DailyMemoQty8=null, DailyMemoMinutes8=null, DateModified=DateTime.Now},
                new DailyMemoTransactions { DailyMemoHeaderId=timesheetHeaders.Single(t => t.EmpId == 4).DailyMemoHeaderId, TransDepartmentId=3, TaskId=11, TaskType="Task", TaskDescr="Work with bank to establish credit amount", DailyMemoQty1=null, DailyMemoMinutes1=null, DailyMemoQty2=null, DailyMemoMinutes2=null, DailyMemoQty3=null, DailyMemoMinutes3= null, DailyMemoQty4=1, DailyMemoMinutes4=60, DailyMemoQty5=null, DailyMemoMinutes5=null, DailyMemoQty6=1, DailyMemoMinutes6=60, DailyMemoQty7=1, DailyMemoMinutes7=45, DailyMemoQty8=1, DailyMemoMinutes8=60, DateModified=DateTime.Now}
            };

            foreach (DailyMemoTransactions t in timesheetTransactions)
            {
                context.DailyMemoTransactions.Add(t);
            }

            context.SaveChanges();

        }
    }
}
