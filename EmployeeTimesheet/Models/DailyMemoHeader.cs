using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeTimesheet.Models
{
    public class DailyMemoHeader
    {
        public int DailyMemoHeaderId { get; set; }

        public int EmpId { get; set; }

        [Column(TypeName = "date")]
        [DisplayFormat(DataFormatString = "{0:MM/dd/yyyy}")]
        public DateTime CreateDate { get; set; }

        public int HeaderDepartmentId { get; set; }

        public int? WorkId { get; set; }

        public string Suggestions { get; set; }

        public bool Submitted { get; set; }

        public DateTime? DateSubmitted { get; set; }

        public DateTime DateModified { get; set; }
        public ICollection<DailyMemoTransactions> DailyMemoTransactions { get; set; }
    }
}
