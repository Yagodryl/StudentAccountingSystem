using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentAccountingSystem.Areas.Student.ViewModels;
using StudentAccountingSystem.DAL;

namespace StudentAccountingSystem.Areas.Student.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Produces("application/json")]

    public class CourseController : ControllerBase
    {
        private readonly EFDBContext _context;

        public CourseController(EFDBContext context)
        {
            _context = context;

        }

        [HttpGet("list-courses")]
        public async Task<IActionResult> ListCourses()
        {
            var model = await _context.Courses.Select(c => new CourseModel
            {
                Id = c.Id,
                Description = c.ShortDescription,
                Image = c.Image,
                Title = c.Name
            }).ToArrayAsync();

            return Ok(model);
        }
        [HttpGet("get-course-info/{id}")]
        public async Task<IActionResult> ListCoursesAsync(long id)
        {
            var data = await _context.CourseDescriptions.SingleOrDefaultAsync(c => c.Id == id);
            var model = new CourseInfoModel
            {
                Description = data.Description
            };
            return Ok(model);
        }
    }
}
