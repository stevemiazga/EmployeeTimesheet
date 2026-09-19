using EmployeeTimesheet.Infrastructure;
using EmployeeTimesheet.Models;
using EmployeeTimesheet.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections;
using System.Threading.Tasks;

namespace EmployeeTimesheet.Controllers
{
    public class TimesheetController : Controller
    {
        private IDailyMemoRepository dailyMemoRepository;

        public TimesheetController(IDailyMemoRepository dailyMemoRepository)
        {
            this.dailyMemoRepository = dailyMemoRepository;
        }

        public IActionResult Index(bool temp)
        {
            ViewBag.TempUser = temp;
            return View();
        }

        public async Task<IActionResult> Create()
        {
            string userName = GetUserName();
            var missing = new ArrayList();

            EmployeeData employee = await dailyMemoRepository.SelectByEmpIDAsync(userName);

            if (employee == null)
            {
                missing.Add("Your User Name: " + userName + " is not registered.");
                ViewBag.Missing = missing;
                return View("CreateMissing");
            }

            if (employee.EmpId == 0 || employee.DepartmentId == 0 || employee.FirstName == null || employee.LastName == null)
            {
                if (employee.FirstName == null && employee.LastName == null)
                {
                    missing.Add("Your First and Last Name is not registred.");
                }
                if (employee.EmpId == 0)
                {
                    missing.Add("Your Employee Id is not registered.");
                }
                if (employee.DepartmentId == 0)
                {
                    missing.Add("Your Department Name is not registered.");
                }

                ViewBag.Missing = missing;

                return View("CreateMissing");
            }

            int dailyMemoHeaderId = await dailyMemoRepository.GetDailyMemoHeaderIdAsync(employee.EmpId, DateTime.Today);

            if (HttpContext.Session.GetInt32("DailyMemoHeaderId") != null)
            {
                HttpContext.Session.Remove("DailyMemoHeaderId");
            }

            HttpContext.Session.SetInt32("DailyMemoHeaderId", dailyMemoHeaderId);

            if (dailyMemoHeaderId == 0)
            {
                //if (DailyMemoUtility.IsMeetCutoffTime(out DateTime currentTime, out DateTime cutoffTime) == false)
                //{
                //    ViewBag.CutOffTime = cutoffTime;
                //    ViewBag.CurrentTime = currentTime;
                //    return View("MissCutoff");
                //}

                await dailyMemoRepository.CreateDailyMemoAsync(employee, dailyMemoHeaderId);

                dailyMemoHeaderId = await dailyMemoRepository.GetDailyMemoHeaderIdAsync(employee.EmpId, DateTime.Today);

                if (HttpContext.Session.GetInt32("DailyMemoHeaderId") != null)
                {
                    HttpContext.Session.Remove("DailyMemoHeaderId");
                }

                HttpContext.Session.SetInt32("DailyMemoHeaderId", dailyMemoHeaderId);
            }

            var isDailyMemoSubmitted = await dailyMemoRepository.IsDailyMemoSubmittedAsync(dailyMemoHeaderId);
            if (isDailyMemoSubmitted.Submitted == true)
            {
                if (HttpContext.Session.Get<DailyMemoSubmitted>("Submitted") != null)
                {
                    HttpContext.Session.Remove("Submitted");
                }

                HttpContext.Session.Set<DailyMemoSubmitted>("Submitted", isDailyMemoSubmitted);
            }

            return RedirectToAction("Edit");
        }

        public async Task<ActionResult> GetDetails()
        {
            int? id;

            if (HttpContext.Session.GetInt32("DailyMemoHeaderId") != null)
            {
                id = HttpContext.Session.GetInt32("DailyMemoHeaderId");
            }
            else
            {
                int employeeNumber = await dailyMemoRepository.SelectEmpIDAsync(GetUserName());
                id = await dailyMemoRepository.GetDailyMemoHeaderIdAsync(employeeNumber, DateTime.Today);
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

            if (HttpContext.Session.Get<DailyMemoSubmitted>("Submitted") != null)
            {
                DailyMemoSubmitted isSubmitted = HttpContext.Session.Get<DailyMemoSubmitted>("Submitted");
                if (isSubmitted.Submitted == true)
                {
                    ViewBag.Title = "Your timesheet has been submitted successfully at " + isSubmitted.DateSubmitted.ToString() + ".  Select \"Re-Submit\" button if you want to edit and then make sure to submit again.";
                    ViewBag.Submitted = "Yes";
                }
            }
            //else if (DailyMemoUtility.IsMeetCutoffTime(out DateTime currentTime, out DateTime cutoffTime) == false)
            //{
            //    ViewBag.Title = "Current timesheet past today's cut off time at " + cutoffTime;
            //}

            return View("Details", model);
        }

        public ActionResult ReSubmit()
        {
            if (HttpContext.Session.Get<DailyMemoSubmitted>("Submitted") != null)
            {
                HttpContext.Session.Remove("Submitted");
            }
            return RedirectToAction("Edit", "Timesheet");
        }

        [CutoffTime]
        public async Task<ActionResult> Edit()
        {
            int? id;

            if (HttpContext.Session.GetInt32("DailyMemoHeaderId") != null)
            {
                id = HttpContext.Session.GetInt32("DailyMemoHeaderId");
            }
            else
            {
                int employeeNumber = await dailyMemoRepository.SelectEmpIDAsync(GetUserName());
                id = await dailyMemoRepository.GetDailyMemoHeaderIdAsync(employeeNumber, DateTime.Today);
            }

            if (id == null || id == 0)
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
            ViewBag.WorkingHoursDropDown = new SelectList(await dailyMemoRepository.GetWorkingHoursAsync(), "WorkId", "WorkHours");
            ViewBag.DepartmentDropDown = new SelectList(await dailyMemoRepository.GetDepartmentsAsync(), "DepartmentId", "DepartmentDesc");

            return View("Edit", model);
        }

        [HttpPost]
        [CutoffTime]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Edit(DailyMemoIndividual dailyMemoIndividual, string employeeNameDate, string notification, string activecell)
        {
            if (ModelState.IsValid)
            {
                if (notification == "submit")
                {
                    dailyMemoIndividual.DailyMemoHeader.Submitted = true;
                    dailyMemoIndividual.DailyMemoHeader.DateSubmitted = DateTime.Now;
                }
                else
                {
                    dailyMemoIndividual.DailyMemoHeader.Submitted = false;
                    dailyMemoIndividual.DailyMemoHeader.DateSubmitted = null;
                }

                await dailyMemoRepository.EditDailyMemoAsync(dailyMemoIndividual);

                if (notification == "submit")
                {
                    if (HttpContext.Session.Get<DailyMemoSubmitted>("Submitted") != null)
                    {
                        HttpContext.Session.Remove("Submitted");
                    }

                    DailyMemoSubmitted dailyMemoSubmitted = new DailyMemoSubmitted();
                    dailyMemoSubmitted.Submitted = dailyMemoIndividual.DailyMemoHeader.Submitted;
                    dailyMemoSubmitted.DateSubmitted = dailyMemoIndividual.DailyMemoHeader.DateSubmitted;

                    HttpContext.Session.Set<DailyMemoSubmitted>("Submitted", dailyMemoSubmitted);

                    return RedirectToAction("GetDetails", "Timesheet");
                }

                if (notification == "autosave")
                {
                    ViewBag.Notification = "Automatically Saved Successfully";
                }
                else if (notification == "save")
                {
                    ViewBag.Notification = "Saved Successfully";
                }

            }
            else
            {
                if (notification == "save")
                {
                    ViewBag.Notification = "Saved Invalid";
                }
                else if (notification == "submit")
                {
                    ViewBag.Notification = "Submitted Invalid";
                }
            }

            ViewBag.EmployeeNameDate = employeeNameDate;
            ViewBag.WorkingHoursDropDown = new SelectList(await dailyMemoRepository.GetWorkingHoursAsync(), "WorkId", "WorkHours");
            ViewBag.DepartmentDropDown = new SelectList(await dailyMemoRepository.GetDepartmentsAsync(), "DepartmentId", "DepartmentDesc");
            ViewBag.ActiveCell = activecell;

            return View(dailyMemoIndividual);
        }

        public async Task<JsonResult> GetTasksByDept(int departId)
        {
            var taskData = await dailyMemoRepository.GetTasksByDepartmentAsync(departId);
            return Json(new { data = taskData });
        }

        public async Task<JsonResult> GetWorkingHoursById(int workId)
        {
            WorkingHours workingHours = await dailyMemoRepository.GetWorkingHoursByIdAsync(workId);
            return Json(new { data = workingHours });
        }

        public async Task<IActionResult> CreateEmployee()
        {
            RegisterViewModel model = new RegisterViewModel();

            if (HttpContext.Session.Get<RegisterViewModel>("CreateEmployee") != null)
            {
                model = HttpContext.Session.Get<RegisterViewModel>("CreateEmployee");
                HttpContext.Session.Remove("CreateEmployee");
            }
            else
            {
                return RedirectToAction("Register", "User");
            }

            EmployeeData employeeData = new EmployeeData()
            {
                EmpId = 0,
                UserName = model.UserName,
                DepartmentId = model.DepartmentId,
                Email = model.Email,
                WorkExt = model.WorkExt,
                FirstName = model.FirstName,
                LastName = model.LastName,
                StartTime = model.StartTime
            };

            await dailyMemoRepository.CreateEmployeeAsync(employeeData);

            return RedirectToAction("Login", "User");
        }

        public string GetUserName()
        {
            return HttpContext.User.Identity.Name;
        }
    }
}