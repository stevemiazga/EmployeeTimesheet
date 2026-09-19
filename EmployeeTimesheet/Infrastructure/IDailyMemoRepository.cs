using EmployeeTimesheet.Models;
using EmployeeTimesheet.ViewModels;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace EmployeeTimesheet.Infrastructure
{
    public interface IDailyMemoRepository
    {
        //Daily Memo calls
        Task<List<DailyMemoDates>> GetDailyMemoDatesAsync(int empId, DateTime startDate, DateTime endDate);

        Task<int> GetDailyMemoHeaderIdAsync(int empId, DateTime createDate);

        Task<DailyMemoSubmitted> IsDailyMemoSubmittedAsync(int dailyMemoHeaderId);

        Task<DailyMemoIndividual> GetDailyMemoDetailsAsync(int? id);

        Task CreateDailyMemoAsync(EmployeeData employeeData, int dailyMemoHeaderId);

        Task EditDailyMemoAsync(DailyMemoIndividual dailyMemoIndividual);

        Task ReplaceDailyMemoAsync(int replaceDailyMemoHeaderId, int empId, string userName, DateTime createDate);

        //Employee calls
        Task<EmployeeData> SelectByEmpIDAsync(string userId);

        Task<int> SelectEmpIDAsync(string userId);

        Task<string> SelectEmpNameAsync(string userId);

        Task CreateEmployeeAsync(EmployeeData employeeData);

        //Department calls
        Task<List<Departments>> GetDepartmentsAsync();

        //Working Hours calls
        Task<WorkingHours> GetWorkingHoursByIdAsync(int? workId);

        Task<List<WorkingHours>> GetWorkingHoursAsync();

        //Task calls
        Task<List<Tasks>> GetTasksByDepartmentAsync(int departId);

    }
}