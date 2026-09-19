using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EmployeeTimesheet.Data
{
    public class IdentityDataContext : IdentityDbContext<IdentityUser>
    {
        public IdentityDataContext(DbContextOptions<IdentityDataContext> options)
            : base(options) { }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
            builder.Entity<IdentityUser>().ToTable("AspNetUsers_Core2");
            builder.Entity<IdentityRole>().ToTable("AspNetRoles_Core2");
            builder.Entity<IdentityUserClaim<string>>().ToTable("AspNetUserClaims_Core2");
            builder.Entity<IdentityUserRole<string>>().ToTable("AspNetUserRoles_Core2");
            builder.Entity<IdentityUserLogin<string>>().ToTable("AspNetUserLogins_Core2");
            builder.Entity<IdentityRoleClaim<string>>().ToTable("AspNetRoleClaims_Core2");
            builder.Entity<IdentityUserToken<string>>().ToTable("AspNetUserTokens_Core2");

        }

    }
}
