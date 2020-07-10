using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentAccountingSystem.Areas.Student.ViewModels;
using StudentAccountingSystem.DAL;
using StudentAccountingSystem.DAL.Entities;

namespace StudentAccountingSystem.Areas.Student.Controllers
{
    [Route("api/[controller]")]
    //[ApiController]
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
            var data = await _context.CourseDescriptions
                .Include(c=>c.Course)
                .SingleOrDefaultAsync(c => c.Id == id);
            var model = new CourseInfoModel
            {
                Image = data.Course.Image,
                Title = data.Course.Name,
                ShortDescription = data.Course.ShortDescription,
                Description = data.Description
            };
            var userId = long.Parse(User.Claims.ToList()[0].Value);
            var studentCourse = _context.StudentCourses.SingleOrDefault(sc => sc.CourseId == id && sc.StudentProfileId == userId);
            if (studentCourse != null)
            {
                model.IsSubscribed = true;
                model.StartDate = studentCourse.StartDate.ToString("dd/MM/yyyy");
            }

            return Ok(model);
        }
        [HttpPost("subscribe")]
        public async Task<IActionResult> Subscribe([FromBody] SubscribeModel model)
        {
            if (User.Identity.IsAuthenticated)
            {
                var userId = User.Claims.ToList()[0].Value;

                var studentCourse = new StudentCourse
                {
                    StudentProfileId = long.Parse(userId),
                    StartDate = DateTime.Parse(model.StudyDate),
                    CourseId = long.Parse(model.CourseId)

                };
                await _context.StudentCourses.AddAsync(studentCourse);
                await _context.SaveChangesAsync();

                return Ok();
            }
            else
            {
                return BadRequest("Будь ласка авторизуйтесь");
            }
        }
    }
}
