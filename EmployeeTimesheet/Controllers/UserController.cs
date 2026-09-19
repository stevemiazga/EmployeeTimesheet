using EmployeeTimesheet.Models;
using EmployeeTimesheet.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeTimesheet.Controllers
{
    public class UserController : Controller
    {
        public SignInManager<IdentityUser> SignInManager { get; set; }
        public UserManager<IdentityUser> UserManager { get; set; }

        public UserController(SignInManager<IdentityUser> signInManager, UserManager<IdentityUser> userManager)
        {
            SignInManager = signInManager;
            UserManager = userManager;
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Login(string returnUrl = null)
        {
            ViewBag.ReturnUrl = returnUrl;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Login(LoginViewModel model, string returnUrl = null)
        {
            try
            {
                if (ModelState.IsValid)
                {
                    var signInStatus = await SignInManager.PasswordSignInAsync(model.UserName, model.Password, model.RememberMe, lockoutOnFailure: false);
                    if (signInStatus.Succeeded)
                    {
                        if (string.IsNullOrEmpty(returnUrl))
                        {
                            return RedirectToAction("Index", "Timesheet");
                        }
                        return RedirectToLocal(returnUrl);
                    }
                    else
                    {
                        ModelState.AddModelError("", "Invalid username or password.");
                        return View(model);
                    }
                }
                else
                {
                    return RedirectToAction("Register", "User");
                }


            }
            catch (System.Exception ex)
            {

            }

            return View(model);
        }


        [HttpGet]
        public async Task<IActionResult> LogOff()
        {
            string userName = HttpContext.User.Identity.Name;

            await SignInManager.SignOutAsync();

            if (userName.Contains("tempu"))
            {
                return RedirectToAction("DeleteTempUser", "TempUser",new {userName =userName });
            }
            
            return RedirectToAction("Index", "Home");
        }

        [HttpGet]
        [AllowAnonymous]
        public IActionResult Register()
        {
            List<Departments> departments = new List<Departments>()
            {
                new Departments{ DepartmentId = 1, DepartmentDesc ="IT"},
                new Departments{ DepartmentId = 2, DepartmentDesc ="Sales"},
                new Departments{ DepartmentId = 3, DepartmentDesc="Accounting"}
            };

            List<StartTime> starttimes = new List<StartTime>()
            {
                new StartTime{ StartTimeText="9:00 AM", StartTimeValue="9:00"},
                new StartTime{ StartTimeText="8:30 AM", StartTimeValue="8:30"},
                new StartTime{ StartTimeText="8:00 AM", StartTimeValue="8:00"},
                new StartTime{ StartTimeText="7:30 AM", StartTimeValue="7:30"},
                new StartTime{ StartTimeText="7:00 AM", StartTimeValue="7:00"}
            };

            ViewBag.DepartmentDropDown = departments;
            ViewBag.StartTimeDropDown = starttimes;
            return View();
        }

        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {

            try
            {
                if (ModelState.IsValid)
                {
                    var user = new IdentityUser { UserName = model.UserName};
                    var result = await UserManager.CreateAsync(user, model.Password);

                    if (result.Succeeded)
                    {
                        await SignInManager.SignInAsync(user, isPersistent: false);

                        if (HttpContext.Session.Get<RegisterViewModel>("CreateEmployee") != null)
                        {
                            HttpContext.Session.Remove("CreateEmployee");
                        }

                        HttpContext.Session.Set<RegisterViewModel>("CreateEmployee", model);

                        return RedirectToAction("CreateEmployee", "Timesheet");
                    }
                    else
                    {
                        return RedirectToAction("Register", "User");
                    }
                }
                else
                {
                    return RedirectToAction("Register", "User");
                }
            }
            catch (System.Exception ex)
            {

            }
            return RedirectToAction("Register", "User");
        }

        private IActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            else
            {
                return RedirectToAction("Index", "Home");
            }
        }

    }

    public class StartTime
    {
        public string StartTimeText { get; set; }
        public string StartTimeValue { get; set; }
    }
}
