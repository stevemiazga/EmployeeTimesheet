using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.AspNetCore.Routing;
using System;

namespace EmployeeTimesheet.Infrastructure
{
    public class CutoffTimeAttribute : ActionFilterAttribute, IActionFilter
    {
        int? timesheetHeaderId;
        public void OnActionExecuted(ActionExecutedContext context)
        {
            //System.Diagnostics.Debug.WriteLine("ActionExecuted");
        }

        public void OnActionExecuting(ActionExecutingContext filterContext)
        {
            //System.Diagnostics.Debug.WriteLine("ActionExecuting");

            if (filterContext.HttpContext.Session.GetInt32("DailyMemoHeaderId") == null)
            {
                filterContext.Result = GenerateRedirectUrl("Create", "Timesheet");
                return;
            }

            timesheetHeaderId = filterContext.HttpContext.Session.GetInt32("DailyMemoHeaderId");
            if (timesheetHeaderId != 0)
            {
                if (filterContext.HttpContext.Session.Get<DailyMemoSubmitted>("Submitted") != null)
                {
                    filterContext.Result = GenerateRedirectUrl("GetDetails", "Timesheet");
                    return;
                }

                //if (DailyMemoUtility.IsMeetCutoffTime(out DateTime currentTime, out DateTime cutoffTime) == false)
                //{
                //    filterContext.Result = GenerateRedirectUrl("GetDetails", "Timesheet");
                //    return;
                //}

            }

            if (timesheetHeaderId == 0)
            {
                filterContext.Result = GenerateRedirectUrl("Create", "Timesheet");
                return;
            }
        }

        private RedirectToRouteResult GenerateRedirectUrl(string action, string controller)
        {
            return new RedirectToRouteResult(new RouteValueDictionary(new { action = action, controller = controller }));
        }
    }
}
