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
        public async Task<IActionResult> AddCourse([FromBody] CourseViewModel model)
        {

            var couseDescription = new CourseDescription
            {
                Description = model.FullDescription,
            };

            _context.CourseDescriptions.Add(couseDescription);
            await _context.SaveChangesAsync();

            var course = new Course
            {
                Name = model.Name,
                ShortDescription = model.ShortDescription,
                Image = model.Image,
                CourseDescriptionId = couseDescription.Id
            };
            await _context.Courses.AddAsync(course);
            await _context.SaveChangesAsync();




            return Ok();
        }

        [HttpPost("get-list-students")]
        public async Task<IActionResult> GetStudents([FromBody] FilterViewModel filter)
        {

            var query = _context.StudentProfiles.AsQueryable();

            switch (filter.Field)
            {
                case "firstName":

                    if (filter.Order == "ascend")
                    {
                        query = query.OrderBy(s => s.FirstName);
                    }
                    else if (filter.Order == "descend")
                    {
                        query = query.OrderByDescending(s => s.FirstName);
                    }
                    break;
                case "lastName":

                    if (filter.Order == "ascend")
                    {
                        query = query.OrderBy(s => s.LastName);
                    }
                    else if (filter.Order == "descend")
                    {
                        query = query.OrderByDescending(s => s.LastName);
                    }
                    break;
                case "birthday":

                    if (filter.Order == "ascend")
                    {
                        query = query.OrderBy(s => s.Birthday);
                    }
                    else if (filter.Order == "descend")
                    {
                        query = query.OrderByDescending(s => s.Birthday);
                    }
                    break;
                case "registerDate":

                    if (filter.Order == "ascend")
                    {
                        query = query.OrderBy(s => s.RegisterDate);
                    }
                    else if (filter.Order == "descend")
                    {
                        query = query.OrderByDescending(s => s.RegisterDate);
                    }
                    break;
                case "email":

                    if (filter.Order == "ascend")
                    {
                        query = query.OrderBy(s => s.User.Email);
                    }
                    else if (filter.Order == "descend")
                    {
                        query = query.OrderByDescending(s => s.User.Email);
                    }
                    break;
            }


            var model = await query.Select(s => new StudentViewModel
            {
                Id = s.Id,
                Key = s.Id,
                Email = s.User.Email,
                FirstName = s.FirstName,
                LastName = s.LastName,
                Birthday = s.Birthday.ToShortDateString(),
                RegisterDate = s.RegisterDate.ToShortDateString(),
                StudyDates = s.StudentCourses.Select(sc => sc.StartDate.ToShortDateString()).ToList()
            })
                .Skip((filter.Current-1)*filter.PageSize)
                .Take(filter.PageSize)
                .ToArrayAsync();

            return Ok(model);
        }


    }
}
