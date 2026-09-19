using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeTimesheet.Models
{
    public class Tasks
    {
        [Key]
        public int TaskId { get; set; }

        [Required]
        public string TaskDescr { get; set; }

        public int DepartmentId { get; set; }
    }
}
