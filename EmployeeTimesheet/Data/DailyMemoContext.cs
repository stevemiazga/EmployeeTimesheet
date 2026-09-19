using EmployeeTimesheet.Models;
using Microsoft.EntityFrameworkCore;

namespace EmployeeTimesheet.Data
{
    public class DailyMemoContext : DbContext
    {
        
        public DailyMemoContext(DbContextOptions<DailyMemoContext> options): base (options)
        {
            //this.Database.Log = s => System.Diagnostics.Debug.WriteLine(s);
        }

        public DbSet<DailyMemoHeader> DailyMemoHeader { get; set; }
        public DbSet<DailyMemoTransactions> DailyMemoTransactions { get; set; }
        public DbSet<Departments> Departments { get; set; }
        public DbSet<Employee> Employees { get; set; }
        public DbSet<Tasks> Tasks { get; set; }
        public DbSet<WorkingHours> WorkingHours { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<DailyMemoHeader>()
                .Property(e => e.Suggestions)
                .IsUnicode(false);

            modelBuilder.Entity<DailyMemoTransactions>()
                .Property(e => e.TaskType)
                .IsUnicode(false);

            modelBuilder.Entity<DailyMemoTransactions>()
                .Property(e => e.TaskDescr)
                .IsUnicode(false);

            modelBuilder.Entity<Departments>()
                .Property(e => e.DepartmentDesc)
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .Property(e => e.UserName)
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .Property(e => e.DepartmentDescr)
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .Property(e => e.FirstName)
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .Property(e => e.MiddleInit)
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .Property(e => e.LastName)
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .Property(e => e.Email)
                .IsUnicode(false);

            modelBuilder.Entity<Employee>()
                .Property(e => e.WorkExt)
                .IsUnicode(false);

            modelBuilder.Entity<Tasks>()
                .Property(e => e.TaskDescr)
                .IsUnicode(false);

            modelBuilder.Entity<WorkingHours>()
                .Property(e => e.WorkHours)
                .IsUnicode(false);

            modelBuilder.Entity<WorkingHours>()
                .Property(e => e.WorkHours1)
                .IsUnicode(false);

            modelBuilder.Entity<WorkingHours>()
                .Property(e => e.WorkHours2)
                .IsUnicode(false);

            modelBuilder.Entity<WorkingHours>()
                .Property(e => e.WorkHours3)
                .IsUnicode(false);

            modelBuilder.Entity<WorkingHours>()
                .Property(e => e.WorkHours4)
                .IsUnicode(false);

            modelBuilder.Entity<WorkingHours>()
                .Property(e => e.WorkHours5)
                .IsUnicode(false);

            modelBuilder.Entity<WorkingHours>()
                .Property(e => e.WorkHours6)
                .IsUnicode(false);

            modelBuilder.Entity<WorkingHours>()
                .Property(e => e.WorkHours7)
                .IsUnicode(false);

            modelBuilder.Entity<WorkingHours>()
                .Property(e => e.WorkHours8)
                .IsUnicode(false);
        }
    }


}

