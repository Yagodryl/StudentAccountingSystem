using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using StudentAccountingSystem.Areas.Account.ViewModels;
using StudentAccountingSystem.DAL;
using StudentAccountingSystem.DAL.Entities;
using StudentAccountingSystem.Services.Abstraction;
using StudentAccountingSystem.Services.Implemetation;
using StudentAccountingSystem.Validators.Responces;

namespace StudentAccountingSystem.Areas.Account.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ExternalAuthController : ControllerBase
    {
        private readonly UserManager<DbUser> _userManager;
        private readonly FacebookAuthSettings _fbAuthSettings;
        private readonly IJWTTokenService _tokenService;
        private readonly IAccountService _accountService;
        private readonly SignInManager<DbUser> _signInManager;

        private static readonly HttpClient Client = new HttpClient();

        public ExternalAuthController(UserManager<DbUser> userManager,
            IOptions<FacebookAuthSettings> fbAuthSettings,
            IJWTTokenService tokenService,
            SignInManager<DbUser> signInManager,
            IAccountService accountService)
        {
            _userManager = userManager;
            _fbAuthSettings = fbAuthSettings.Value;
            _tokenService = tokenService;
            _accountService = accountService;
            _signInManager = signInManager;
        }

        [HttpPost("facebook")]
        public async Task<IActionResult> Facebook([FromBody] FacebookAuthViewModel model)
        {
            try
            {

                var appAccessTokenResponse = await Client.GetStringAsync($"https://graph.facebook.com/oauth/access_token?client_id={_fbAuthSettings.AppId}&client_secret={_fbAuthSettings.AppSecret}&grant_type=client_credentials");
                var appAccessToken = JsonConvert.DeserializeObject<FacebookAppAccessToken>(appAccessTokenResponse);

                var userAccessTokenValidationResponse = await Client.GetStringAsync($"https://graph.facebook.com/debug_token?input_token={model.AccessToken}&access_token={appAccessToken.AccessToken}");
                var userAccessTokenValidation = JsonConvert.DeserializeObject<FacebookUserAccessTokenValidation>(userAccessTokenValidationResponse);

                if (!userAccessTokenValidation.Data.IsValid)
                {
                    return BadRequest(new ErrorResponce { Errors = new List<ErrorModel> { new ErrorModel { Message = "Помилка при вході в обліковий запис Facebook!" } } });
                }
                var userInfoResponse = await Client.GetStringAsync($"https://graph.facebook.com/v2.8/me?fields=id,email,first_name,last_name,name,gender,locale,birthday,picture&access_token={model.AccessToken}");
                var userInfo = JsonConvert.DeserializeObject<FacebookUserData>(userInfoResponse);

                var user = await _userManager.FindByEmailAsync(userInfo.Email);

                if (user == null)
                {
                    var roleName = "Student";

                    var userProf = new DbUser
                    {
                        UserName = userInfo.Email,
                        Email = userInfo.Email,
                        FacebookId = userInfo.Id,
                        EmailConfirmed = true
                    };
                    var result = await _userManager.CreateAsync(userProf);

                    var student = new StudentProfile
                    {
                        Id = userProf.Id,
                        FirstName = userInfo.FirstName,
                        LastName = userInfo.LastName,
                        RegisterDate = DateTime.Now,
                        Birthday = DateTime.Parse(userInfo.Birthday)
                    };
                    await _accountService.CreateStudentProfile(student);
                    result = _userManager.AddToRoleAsync(userProf, roleName).Result;
                    if (!result.Succeeded)
                    {
                        return BadRequest(new ErrorResponce { Errors = new List<ErrorModel> { new ErrorModel { Message = "Помилка при реєстрації" } } });
                    }

                }
                var localUser = await _userManager.FindByNameAsync(userInfo.Email);
                await _signInManager.SignInAsync(localUser, isPersistent: false);

                return Ok(_tokenService.CreateToken(localUser));
            }
            catch
            {
                return BadRequest(new ErrorResponce { Errors = new List<ErrorModel> { new ErrorModel { Message = "Помилка при вході" } } });

            }
        }
    }
}
