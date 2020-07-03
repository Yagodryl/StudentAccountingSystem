using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using StudentAccountingSystem.Areas.Admin.ViewModels;
using StudentAccountingSystem.DAL;
using StudentAccountingSystem.DAL.Entities;

namespace StudentAccountingSystem.Areas.Admin.Controllers
{
   
    [Route("api/[controller]")]
    [Produces("application/json")]

    public class AdminController : ControllerBase
    {

        private readonly EFDBContext _context;

        public AdminController(EFDBContext context)
        {
            _context = context;

        }

        [HttpPost("upload-course-image")]
        [RequestSizeLimit(5 * 1024 * 1024)] // size 5mb
        public IActionResult UploadCourseImage(IFormFile model)
        {

            return Ok();
        }
        [HttpPost("add-course")]
        public IActionResult AddCourse ([FromBody] CourseViewModel model)
        {
            var couseDescription = new CourseDescription
            {
                Description = model.FullDescription
            };
            _context.CourseDescriptions.Add(couseDescription);
            _context.SaveChanges();

            var course = new Course {
                Name = model.Name,
                ShortDescription = model.ShortDescription,
                Image = model.Image,
                CourseDescription = couseDescription
            };
            _context.Courses.Add(course);
            _context.SaveChanges();

            return Ok();
        }


    }
}
