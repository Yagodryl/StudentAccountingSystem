using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using StudentAccountingSystem.Areas.Account.ViewModels;
using StudentAccountingSystem.DAL;
using StudentAccountingSystem.DAL.Entities;
using StudentAccountingSystem.Services.Abstraction;
using StudentAccountingSystem.Services.Implemetation;
using StudentAccountingSystem.Validators.Responces;

namespace StudentAccountingSystem.Areas.Account
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly UserManager<DbUser> _userManager;
        private readonly SignInManager<DbUser> _signInManager;
        private readonly IJWTTokenService _tokenService;
        private readonly IEmailService _emailService;
        private readonly IAccountService _accountService;
        public AccountController(
           UserManager<DbUser> userManager,
           SignInManager<DbUser> signInManager,
           IJWTTokenService tokenService,
           IEmailService emailService,
           IAccountService accountService)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _tokenService = tokenService;
            _emailService = emailService;
            _accountService = accountService;
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginViewModel model)
        {
            var user = await _userManager.FindByNameAsync(model.Email);
            if (user != null)
            {
                if (!await _userManager.IsEmailConfirmedAsync(user))
                {
                    return BadRequest(new ErrorResponce { Errors = new List<ErrorModel> { new ErrorModel { Message = "Email не підтверджено!"} } });
                }
            }
            else
            {
                return BadRequest(new ErrorResponce { Errors = new List<ErrorModel> { new ErrorModel { Message = "Користувача із вказаними обліковими даними не знайдено" } } });
            }
            var result = _signInManager
                .PasswordSignInAsync(user, model.Password, false, false).Result;
            if (!result.Succeeded)
            {
                return BadRequest(new ErrorResponce { Errors = new List<ErrorModel> { new ErrorModel { Message = "Email або пароль введено невіроно" } } });
            }
            await _signInManager.SignInAsync(user, isPersistent: false);
            return Ok(_tokenService.CreateToken(user));
        }

        [HttpGet]
        [AllowAnonymous]
        public async Task<IActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                return BadRequest("Error");
            }
            var user = await _userManager.FindByIdAsync(userId);
            if (user == null)
            {
                return BadRequest("Error");
            }
            var result = await _userManager.ConfirmEmailAsync(user, code);
            if (result.Succeeded)
                return RedirectToAction("Index", "Home");
            else
                return BadRequest("Error");
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRgisterViewModel model)
        {
            try
            {
                var userByEmail = await _userManager.FindByNameAsync(model.Email);
                if (userByEmail != null)
                {
                    return BadRequest(new ErrorResponce { Errors = new List<ErrorModel> { new ErrorModel { Message = "Користувач з даним Email уже зареєстрований" } } });
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

                await _accountService.CreateStudentProfile(student);

                result = _userManager.AddToRoleAsync(user, roleName).Result;

                if (result.Succeeded)
                {
                    var code = await _userManager.GenerateEmailConfirmationTokenAsync(user);
                    var callbackUrl = Url.Action(
                        "ConfirmEmail",
                        "Account",
                        new { userId = user.Id, code = code },
                        protocol: HttpContext.Request.Scheme);
                    //EmailService emailService = new EmailService();
                    await _emailService.SendEmailAsync(model.Email, "Підтвердіть свій акаунт!",
                        $"Підтвердіть свій профіль, перейшовши за посиланням: <a href='{callbackUrl}'>link</a>");

                }
                else
                {
                    return BadRequest(new ErrorResponce { Errors = new List<ErrorModel> { new ErrorModel { Message = "Помилка при реєстрації" } } });
                }

                //await _signInManager.SignInAsync(user, isPersistent: false);
                return Ok(/*_tokenService.CreateToken(user)*/);
            }
            catch
            {
                return BadRequest(new ErrorResponce { Errors = new List<ErrorModel> { new ErrorModel { Message = "Помилка при реєстрації" } } });
            }
        }
    }
}
