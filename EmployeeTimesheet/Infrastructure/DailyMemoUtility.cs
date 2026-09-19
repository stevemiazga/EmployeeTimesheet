using System;

namespace EmployeeTimesheet.Infrastructure
{
    public class DailyMemoUtility
    {
        public static bool IsMeetCutoffTime(out DateTime currentTime, out DateTime cutoffTime)
        {
            currentTime = DateTime.Now;
            TimeSpan cutoff = new TimeSpan(17, 00, 00);
            cutoffTime = DateTime.Today + cutoff;

            if (currentTime > cutoffTime)
            {
                return false;
            }
            else
            {
                return true;
            }
        }
    }

    public class DailyMemoDates
    {
        public int DailyMemoHeaderId { get; set; }
        public string CreateDate { get; set; }
    }

    public class DailyMemoSubmitted
    {
        public bool Submitted { get; set; }
        public DateTime? DateSubmitted { get; set; }
    }
}