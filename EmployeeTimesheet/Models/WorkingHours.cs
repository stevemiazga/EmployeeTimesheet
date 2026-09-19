using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeTimesheet.Models
{
    public class WorkingHours
    {
        [Key]
        public int WorkId { get; set; }

        public TimeSpan StartTime { get; set; }

        [Required]
        [StringLength(50)]
        public string WorkHours { get; set; }

        [Required]
        [StringLength(50)]
        public string WorkHours1 { get; set; }

        [Required]
        [StringLength(50)]
        public string WorkHours2 { get; set; }

        [Required]
        [StringLength(50)]
        public string WorkHours3 { get; set; }

        [Required]
        [StringLength(50)]
        public string WorkHours4 { get; set; }

        [Required]
        [StringLength(50)]
        public string WorkHours5 { get; set; }

        [Required]
        [StringLength(50)]
        public string WorkHours6 { get; set; }

        [Required]
        [StringLength(50)]
        public string WorkHours7 { get; set; }

        [Required]
        [StringLength(50)]
        public string WorkHours8 { get; set; }

        public int TotMins { get; set; }
    }
}