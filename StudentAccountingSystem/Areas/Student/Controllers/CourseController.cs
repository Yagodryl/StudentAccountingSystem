using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
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
        public IActionResult ListCourses()
        {
            var model = _context.Courses.Select(c => new CourseModel
            {
                Id = c.Id,
                Description = c.ShortDescription,
                Image = c.Image,
                Title = c.Name
            }).ToList();

            return Ok(model);
        }
    }
}
