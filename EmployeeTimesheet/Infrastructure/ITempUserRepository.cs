using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeTimesheet.Infrastructure
{
    public interface ITempUserRepository
    {
        Task CreateTempUserIdentityAsync();

        Task<bool> DeleteTempDataAsync(string userName);

        Task<bool> DeleteTempUser(string userName);
    }
}
