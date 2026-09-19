using System;

namespace EmployeeTimesheet.ViewModels
{
    public class EmployeeData
    {
        public int EmpId { get; set; }

        public string UserName { get; set; }

        public int DepartmentId { get; set; }

        public string Email { get; set; }

        public string WorkExt { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public TimeSpan? StartTime { get; set; }
    }
}
