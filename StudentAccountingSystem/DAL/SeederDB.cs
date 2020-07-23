
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using StudentAccountingSystem.DAL.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.DAL
{
    public class SeederDB
    {
        public static void SeedUsers(UserManager<DbUser> userManager,
            RoleManager<DbRole> roleManager, EFDBContext _context)
        {
            var count = roleManager.Roles.Count();
            if (count <= 0)
            {
                var roleName = "Student";
                var result = roleManager.CreateAsync(new DbRole
                {
                    Name = roleName
                }).Result;

                roleName = "Admin";
                result = roleManager.CreateAsync(new DbRole
                {
                    Name = roleName
                }).Result;
            }
            count = _context.Users.Count();
            if(count <= 0)
            {
                //List<DbUser> users = new List<DbUser>();
                var user =  new DbUser
                {
                    Email = "admin@gmail.com",
                    UserName = "admin@gmail.com",
                    EmailConfirmed=true
                };
                var result = userManager.CreateAsync(user, "Qwerty1-").Result;             
                result = userManager.AddToRoleAsync(user, "Admin").Result;
                user = new DbUser
                {
                    Email = "email@gmail.com",
                    UserName = "email@gmail.com",
                    EmailConfirmed = true
                };
                
                result = userManager.CreateAsync(user, "Qwerty1-").Result;
                var student = new StudentProfile
                {
                    Id = user.Id,
                    FirstName = "Ivan",
                    LastName = "Ivanov",
                    Birthday = DateTime.Parse("5/1/2000"),
                    RegisterDate = DateTime.Now
                    
                };
                _context.StudentProfiles.Add(student);
                _context.SaveChanges();

                result = userManager.AddToRoleAsync(user, "Student").Result;

            }

        }
        public static void SeedData(IServiceProvider services, IWebHostEnvironment env, IConfiguration config)
        {
            using (var scope = services.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var manager = scope.ServiceProvider.GetRequiredService<UserManager<DbUser>>();
                var managerRole = scope.ServiceProvider.GetRequiredService<RoleManager<DbRole>>();
                var context = scope.ServiceProvider.GetRequiredService<EFDBContext>();
                SeederDB.SeedUsers(manager, managerRole, context);
            }
        }
    }
}
