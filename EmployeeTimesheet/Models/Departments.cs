using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeTimesheet.Models
{
    public class Departments
    {
        [Key]
        public int DepartmentId { get; set; }

        [Required]
        [StringLength(40)]
        public string DepartmentDesc { get; set; }
    }
}
