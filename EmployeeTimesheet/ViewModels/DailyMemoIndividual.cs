using EmployeeTimesheet.Models;

namespace EmployeeTimesheet.ViewModels
{
    public class DailyMemoIndividual
    {
        public DailyMemoHeader DailyMemoHeader { get; set; }

        public DailyMemoTransactions[] DailyMemoTransactions { get; set; }
        
    }
}
