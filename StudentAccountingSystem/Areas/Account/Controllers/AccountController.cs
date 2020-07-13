using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StudentAccountingSystem.Areas.Account.ViewModels;
using StudentAccountingSystem.DAL;
using StudentAccountingSystem.DAL.Entities;
using StudentAccountingSystem.Services.Abstraction;

namespace StudentAccountingSystem.Areas.Account
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly EFDBContext _context;
        private readonly UserManager<DbUser> _userManager;
        private readonly SignInManager<DbUser> _signInManager;
        private readonly IJWTTokenService _tokenService;

        public AccountController(EFDBContext context,
           UserManager<DbUser> userManager,
           SignInManager<DbUser> signInManager,
           IJWTTokenService tokenService)
        {
            _userManager = userManager;
            _context = context;
            _signInManager = signInManager;
            _tokenService = tokenService;

        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Не валідні данні!");
            }
            var user = _context.Users.FirstOrDefault(u => u.Email == model.Email);
            if (user == null)
            {
                return BadRequest("Користувача із вказаними обліковими даними не знайдено");
            }

            var result = _signInManager
                .PasswordSignInAsync(user, model.Password, false, false).Result;
            if (!result.Succeeded)
            {
                return BadRequest(new { invalid = "Email або пароль введено невіроно" });
            }
            await _signInManager.SignInAsync(user, isPersistent: false);
            return Ok(_tokenService.CreateToken(user));
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRgisterViewModel model)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest("Не валідні данні!");
                }
                var userByEmail = _context.Users.SingleOrDefault(u => u.Email == model.Email);
                if (userByEmail != null)
                {
                    return BadRequest("Користувач з даним Email уже зареєстрований");
                }
                var roleName = "Student";
                var user = new DbUser
                {
                    UserName = model.Email,
                    Email = model.Email,
                };
                var result = await _userManager
                   .CreateAsync(user, model.Password);
                var student = new StudentProfile
                {
                    Id = user.Id,
                    FirstName = model.FirstName,
                    LastName = model.LastName,
                    RegisterDate = DateTime.Now,
                    Birthday = DateTime.Parse(model.Birthday)
                };
                _context.StudentProfiles.Add(student);
                _context.SaveChanges();
                result = _userManager.AddToRoleAsync(user, roleName).Result;
                if (!result.Succeeded)
                {
                    return BadRequest("Помилка при реєстрації");
                }

                await _signInManager.SignInAsync(user, isPersistent: false);
                return Ok(_tokenService.CreateToken(user));

            }
            catch
            {
                return BadRequest("Помилка при реєстрації!");

            }
        }
    }
}
