using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

using StudentAccountingSystem.Areas.Admin.ViewModels;
using StudentAccountingSystem.DAL;
using StudentAccountingSystem.DAL.Entities;
using StudentAccountingSystem.Services.Implemetation;
using StudentAccountingSystem.Validators.Responces;

namespace StudentAccountingSystem.Areas.Admin.Controllers
{

    [Route("api/[controller]")]
    [Produces("application/json")]

    public class AdminController : ControllerBase
    {

        private readonly EFDBContext _context;
        private readonly IAccountService _accountService;
        private readonly ICourseService _courseService;
        public AdminController(EFDBContext context,
            IAccountService accountService,
            ICourseService courseService)
        {
            _context = context;
            _accountService = accountService;
            _courseService = courseService;
        }

        [HttpPost("add-course")]
        public async Task<IActionResult> AddCourse(CourseViewModel model )
        {
            await _courseService.AddCourse(model);
            return Ok();
        }

        [HttpPost("get-list-students")]
        public async Task<IActionResult> GetStudents([FromBody] FilterViewModel filter)
        {
            var pageStudent = await _accountService.GetByFilter(filter);

            return Ok(pageStudent);
        }

        [HttpGet("get-student-profile/{id}")]
        public async Task<IActionResult> GetStudentProfile (Guid id)
        {
            return Ok(await _accountService.GetStudentProfile(id));
        }
        [HttpPost("edit-student-profile")]
        public async Task<IActionResult> EditStudentProfile([FromBody] EditStudentProfileModel model)
        {
            try
            {
                await _accountService.EditProfile(model);
                return Ok();
            }
            catch (Exception ex)
            {
                return BadRequest(new ErrorResponce { Errors = new List<ErrorModel> { new ErrorModel { Message = "При редагуванні сталася помилка!"+ex.Message } } });
            }
        }

    }
}
