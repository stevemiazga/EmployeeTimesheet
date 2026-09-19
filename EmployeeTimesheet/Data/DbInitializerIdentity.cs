using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeTimesheet.Data
{
    public static class DbInitializerIdentity
    {
        public static async Task Initialize(IServiceProvider serviceProvider)
        {
                var userManager = serviceProvider.GetService<UserManager<IdentityUser>>();

                var identityUsers = new SeedIdentityUser[]
                {
                    new SeedIdentityUser { UserName="tempu", UserPassword = "tempu123"},
                    new SeedIdentityUser { UserName="miazgas", UserPassword = "Pa$$w0rd"},
                    new SeedIdentityUser { UserName="smithj", UserPassword = "smithj123"},
                    new SeedIdentityUser { UserName="johnsonm", UserPassword = "johnsonm123"}
                };

                foreach(SeedIdentityUser u in identityUsers)
                {
                    IdentityUser user = await userManager.FindByNameAsync(u.UserName);

                    if (user == null)
                    {
                        user = new IdentityUser(u.UserName);
                        IdentityResult result = await userManager.CreateAsync(user, u.UserPassword);
                        if (!result.Succeeded)
                        {
                            throw new Exception("Cannot create user: "
                                + result.Errors.FirstOrDefault());
                        }
                    }
                }

        }
    }

    public class SeedIdentityUser
    {
        public string UserName { get; set; }
        public string UserPassword { get; set; }
    }
}
