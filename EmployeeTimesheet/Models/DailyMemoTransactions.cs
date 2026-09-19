using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EmployeeTimesheet.Models
{
    public class DailyMemoTransactions
    {
        [Key]
        public int DailyMemoTransId { get; set; }

        public int DailyMemoHeaderId { get; set; }

        public int TransDepartmentId { get; set; }

        public int? TaskId { get; set; }

        [StringLength(50)]
        public string TaskType { get; set; }

        public string TaskDescr { get; set; }

        public int? DailyMemoQty1 { get; set; }

        public int? DailyMemoMinutes1 { get; set; }

        public int? DailyMemoQty2 { get; set; }

        public int? DailyMemoMinutes2 { get; set; }

        public int? DailyMemoQty3 { get; set; }

        public int? DailyMemoMinutes3 { get; set; }

        public int? DailyMemoQty4 { get; set; }

        public int? DailyMemoMinutes4 { get; set; }

        public int? DailyMemoQty5 { get; set; }

        public int? DailyMemoMinutes5 { get; set; }

        public int? DailyMemoQty6 { get; set; }

        public int? DailyMemoMinutes6 { get; set; }

        public int? DailyMemoQty7 { get; set; }

        public int? DailyMemoMinutes7 { get; set; }

        public int? DailyMemoQty8 { get; set; }

        public int? DailyMemoMinutes8 { get; set; }

        public DateTime DateModified { get; set; }

        public DailyMemoHeader DailyMemoHeader { get; set; }
    }
}
