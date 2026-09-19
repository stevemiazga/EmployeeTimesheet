using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EmployeeTimesheet.Infrastructure;
using Microsoft.AspNetCore.Http;

namespace EmployeeTimesheet.Controllers
{
    public class TempUserController : Controller
    {
        private ITempUserRepository tempUserRepository;

        public TempUserController(ITempUserRepository tempUserRepository)
        {
            this.tempUserRepository = tempUserRepository;
        }

        public async Task<IActionResult> Create()
        {
            await tempUserRepository.CreateTempUserIdentityAsync();

            return RedirectToAction("Create", "Timesheet");
        }

        public async Task<IActionResult> DeleteTempUser(string userName)
        {
            bool isDeleted = false;

            isDeleted = await tempUserRepository.DeleteTempDataAsync(userName);
            if (isDeleted)
            {
                await tempUserRepository.DeleteTempUser(userName);
            }

            return RedirectToAction("Index", "Home");
        }


    }
}
