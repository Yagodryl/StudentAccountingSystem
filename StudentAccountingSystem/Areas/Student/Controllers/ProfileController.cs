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
using StudentAccountingSystem.Services.Implemetation;

namespace StudentAccountingSystem.Areas.Student.Controllers
{
    [Produces("application/json")]
    [Route("api/profile")]
    public class ProfileController : ControllerBase
    {
        private readonly IAccountService _accountService;

        public ProfileController(IAccountService accountService) =>
            _accountService = accountService;

        [HttpPost("change-image/{id}")]
        public async Task<IActionResult> UploadImage(IFormFile file, Guid id)
        {
          ///  if (User.Identity.IsAuthenticated)
            //{
           //     var userId = Guid.Parse(User.Claims.ToList()[0].Value);

                string ddd = await _accountService.ChangeImage(id, file);
           // }
                return Ok();
        }

        [HttpGet("get-profile")]
        public async Task<IActionResult> GetProfile()
        {
            if (User.Identity.IsAuthenticated)
            {
                var userId = Guid.Parse(User.Claims.ToList()[0].Value);

                return Ok(await _accountService.GetStudentProfile(userId));
            }
            else
            {
                return BadRequest("Будь ласка авторизуйтесь");
            }

        }
    }
}
