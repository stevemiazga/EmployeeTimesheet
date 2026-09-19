using EmployeeTimesheet.ViewModels;
using EmployeeTimesheet.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Threading.Tasks;

namespace EmployeeTimesheet.Controllers
{
    public class TimesheetHistoryController : Controller
    {
        private IDailyMemoRepository dailyMemoRepository;

        public TimesheetHistoryController(IDailyMemoRepository dailyMemoRepository)
        {
            this.dailyMemoRepository = dailyMemoRepository;
        }

        public ActionResult Index()
        {
            return View();
        }

        public async Task<JsonResult> GetDailyMemoDates(string startDate, string endDate)
        {
            string userName = GetUserName();
            DateTime startDate2 = Convert.ToDateTime(startDate);
            DateTime endDate2 = Convert.ToDateTime(endDate);
            int employeeNumber = await dailyMemoRepository.SelectEmpIDAsync(userName);

            var memoDates = await dailyMemoRepository.GetDailyMemoDatesAsync(employeeNumber, startDate2, endDate2);

            return Json(new { memoDates });
        }

        public async Task<ActionResult> GetDetails(int? id)
        {
            if (id == null)
            {
                return BadRequest();
            }
            DailyMemoIndividual model = await dailyMemoRepository.GetDailyMemoDetailsAsync(id);

            if (model.DailyMemoHeader == null)
            {
                return NotFound();
            }

            string userName = GetUserName();
            string employeeName = await dailyMemoRepository.SelectEmpNameAsync(userName);
            ViewBag.EmployeeNameDate = employeeName + " - " + model.DailyMemoHeader.CreateDate.ToString("dddd, MMMM d, yyyy");
            var workingHours = await dailyMemoRepository.GetWorkingHoursByIdAsync(model.DailyMemoHeader.WorkId);
            ViewBag.Workinghours = workingHours;
            ViewBag.DepartmentDropDown = new SelectList(await dailyMemoRepository.GetDepartmentsAsync(), "DepartmentId", "DepartmentDesc");

            return PartialView("_DetailsPartial", model);
        }

        [HttpPost]
        [CutoffTime]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ReplaceDailyMemo(string SelectedHeaderId)
        {
            int employeeId;
            if (SelectedHeaderId == null)
            {
                return BadRequest();
            }
            else
            {
                int replaceDailyMemoheaderId = Convert.ToInt32(SelectedHeaderId);
                string userName = GetUserName();
                employeeId = await dailyMemoRepository.SelectEmpIDAsync(userName);
                DateTime createDate = DateTime.Today;

                await dailyMemoRepository.ReplaceDailyMemoAsync(replaceDailyMemoheaderId, employeeId, userName, createDate);
            }

            return RedirectToAction("Edit", "Timesheet");
        }

        public string GetUserName()
        {
            return HttpContext.User.Identity.Name;
        }
    }

}