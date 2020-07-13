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

        [HttpPost("upload-course-image")]
        [RequestSizeLimit(5 * 1024 * 1024)] // size 5mb
        public IActionResult UploadCourseImage(IFormFile model)
        {

            return Ok();
        }
        [HttpPost("add-course")]
        public async Task<IActionResult> AddCourse([FromBody] CourseViewModel model)
        {
            await _courseService.AddCourse(model);
            return Ok();
        }

        [HttpPost("get-list-students")]
        public async Task<IActionResult> GetStudents([FromBody] FilterViewModel filter)
        {
            var items = await _accountService.GetByFilter(filter);

            return Ok(items);
        }


    }
}
