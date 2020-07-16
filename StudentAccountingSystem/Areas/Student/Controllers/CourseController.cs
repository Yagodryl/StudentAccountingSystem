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
using StudentAccountingSystem.Services.Implemetation;
using AutoMapper;


namespace StudentAccountingSystem.Areas.Student.Controllers
{
    [Route("api/[controller]")]
    [Produces("application/json")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseService _courseService;
        private readonly IMapper _modelMapper;

        public CourseController(EFDBContext context, ICourseService courseService)
        {
            _courseService = courseService;
            _modelMapper = new MapperConfiguration(cfg =>
            {
                cfg.CreateMap<Course, CourseModel>();
            }).CreateMapper();

        }

        [HttpGet("list-courses")]
        public async Task<IActionResult> ListCourses()
        {
            var items = await _courseService.GetAll();
            return Ok(_modelMapper.Map<IEnumerable<Course>, IEnumerable<CourseModel>>(items));
        }

        [HttpGet("get-course-info/{id}")]
        public IActionResult GetCourseInfo(Guid id)
        {
            var userId = Guid.Parse(User.Claims.ToList()[0].Value);
            return Ok(_courseService.GetById(id, userId).Result);
        }

        

        [HttpPost("subscribe")]
        public async Task<IActionResult> Subscribe([FromBody] SubscribeModel model)
        {
            if (User.Identity.IsAuthenticated)
            {
                var userId = User.Claims.ToList()[0].Value;
                var studentCourse = new StudentCourse
                {
                    StudentProfileId = Guid.Parse(userId),
                    StartDate = DateTime.Parse(model.StudyDate),
                    CourseId = Guid.Parse(model.CourseId)
                };
                await _courseService.Subscribe(studentCourse);
                return Ok();
            }
            else
            {
                return BadRequest("Будь ласка авторизуйтесь");
            }
        }
    }
}
