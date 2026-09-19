using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeTimesheet.Models
{
    public class Employee
    {
        [Key]
        public int EmpId { get; set; }

        [Required]
        [StringLength(50)]
        public string UserName{ get; set; }

        public int DepartmentId { get; set; }

        [Required]
        [StringLength(40)]
        public string DepartmentDescr { get; set; }

        [Required]
        [StringLength(40)]
        public string FirstName { get; set; }

        [StringLength(1)]
        public string MiddleInit { get; set; }

        [Required]
        [StringLength(60)]
        public string LastName { get; set; }

        public TimeSpan? StartTime { get; set; }

        [StringLength(50)]
        public string Email { get; set; }

        [StringLength(10)]
        public string WorkExt { get; set; }

        public DateTime DateModified { get; set; }
    }
}