using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeTimesheet.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Error()
        {
            return View();
        }

        public IActionResult About()
        {
            ViewBag.Message = "Employee Timesheet is a mock website hosted on Azure App Services. It is an adapted version based on a work project I did. This version uses ASP.NET MVC Core 2 and Entity Framework Core with a code-first database approach, along with ASP.NET Core Identity to authenicate users. jQuery is used for Ajax calls, custom validation, and animation for the timesheet.";

            return View();
        }

        public IActionResult Contact()
        {
            ViewBag.Message = "Steve Miazga - IT developer for Employee Timesheet - a mock website hosted on Azure App Services.";

            return View();
        }
    }
}
