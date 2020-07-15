using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentAccountingSystem.Areas.Student.ViewModels;
using StudentAccountingSystem.DAL;
using System.Security.Claims;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;

namespace StudentAccountingSystem.Areas.Student.Controllers
{
    [Produces("application/json")]
    [Route("api/profile")]
    public class ProfileController : ControllerBase
    {
        private readonly EFDBContext _context;
        private readonly IConfiguration _configuration;

        public ProfileController(
            IConfiguration configuration,

            EFDBContext context)
        {
            _context = context;
            _configuration = configuration;

        }


        [HttpGet("get-profile")]
        public IActionResult GetProfile()
        {
            if (User.Identity.IsAuthenticated)
            {
                var userId = Guid.Parse(User.Claims.ToList()[0].Value);

                var user = _context.Users
                .Include(s => s.StudentProfile)
                .Single(u => u.Id == userId);

                var profile = new ProfileModel()
                {
                    Id = user.Id,
                    Name = user.StudentProfile.FirstName + ' ' + user.StudentProfile.LastName,
                    Email = user.Email,
                    Image = user.StudentProfile.Image,
                    Birthday = user.StudentProfile.Birthday.ToString("dd/MM/yyyy")
                };

                if (profile != null)
                {
                    string path = $"{_configuration.GetValue<string>("StudentUrlImages")}/500_";
                    profile.Image = profile.Image != null ?
                        path + profile.Image
                        :
                        _configuration.GetValue<string>("StudentUrlImages") +
                        "/500_" + _configuration.GetValue<string>("DefaultImage");
                }

                return Ok(profile);
            }
            else
            {
                return BadRequest("Будь ласка авторизуйтесь");
            }

        }
    }
}
