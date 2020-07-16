using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

using StudentAccountingSystem.DAL.Entities;
using StudentAccountingSystem.Repositories;
using StudentAccountingSystem.Services.Abstraction;
using StudentAccountingSystem.Areas.Student.ViewModels;
using StudentAccountingSystem.Areas.Admin.ViewModels;

namespace StudentAccountingSystem.Services.Implemetation
{
    public class CourseService: ICourseService
    {
        private readonly ICourseRepository _courseRepository;
        private readonly IStudentCourseRepository _studentCourseRepository;
        private readonly ICourseDescriptionRepository _courseDescriptionRepository;
        public CourseService(ICourseRepository courseRepository,
            IStudentCourseRepository studentCourseRepository,
            ICourseDescriptionRepository courseDescriptionRepository)
        {
            _courseRepository = courseRepository;
            _studentCourseRepository = studentCourseRepository;
            _courseDescriptionRepository = courseDescriptionRepository;
        }

        public Task Delete(params object[] keys)
        {
            throw new NotImplementedException();
        }

        public Task<Course> Get(params object[] keys)
        {
            throw new NotImplementedException();
        }

        public async Task<CourseInfoModel> GetById(object courseId, object userId)
        {
            CourseInfoModel item = await _courseRepository.GetAll().Select(c => new CourseInfoModel
            {
                Id = c.Id,
                Description = c.CourseDescription.Description,
                Image = c.Image,
                ShortDescription = c.ShortDescription,
                Title = c.Name
            }).SingleOrDefaultAsync(x => x.Id == (Guid)courseId);

            var studentCourse = await _studentCourseRepository.GetAll()
                                                              .SingleOrDefaultAsync(sc => sc.CourseId == (Guid)courseId &&
                                                                                          sc.StudentProfileId == (Guid)userId);
            if (studentCourse != null)
            {
                item.IsSubscribed = true;
                item.StartDate = studentCourse.StartDate.ToString("dd/MM/yyyy");
            }
            return item;
        }

        public async Task<IEnumerable<Course>> GetAll()
        {
            var items = _courseRepository.GetAll();
            return await items.ToListAsync();
        }

        public async Task AddCourse(CourseViewModel model)
        {
            CourseDescription courseDescription = new CourseDescription { Description = model.FullDescription };
            
            await _courseDescriptionRepository.Insert(courseDescription);
            _courseDescriptionRepository.Save();

            var course = new Course
            {
                Name = model.Name,
                ShortDescription = model.ShortDescription,
                Image = model.Image,
                CourseDescriptionId = courseDescription.Id
            };

            await _courseRepository.Insert(course);
            _courseRepository.Save();
        }

        public Task Update(Course item, object id, byte[] rowVersion)
        {
            throw new NotImplementedException();
        }

        public async Task Subscribe(StudentCourse model)
        {
            await _studentCourseRepository.Insert(model);
            _studentCourseRepository.Save();
        }

        public Task Insert(Course item)
        {
            throw new NotImplementedException();
        }

        public async Task<List<CourseModel>> GetCoursesByUserId(object userId)
        {
            var items = await _studentCourseRepository.GetAll()
                                                      .Where(x => x.StudentProfileId == (Guid)userId)
                                                      .Select(c => new CourseModel
                                                        {
                                                            Id = c.Course.Id,
                                                            Image = c.Course.Image,
                                                            Name = c.Course.Name,
                                                            ShortDescription = c.Course.ShortDescription
                                                        }).ToListAsync();
            return items;
        }
    }
    public interface ICourseService:IDataService<Course>
    {
        public Task<CourseInfoModel> GetById(object courseId, object userId);
        public Task Subscribe(StudentCourse model);
        public Task AddCourse(CourseViewModel model);
        public Task<List<CourseModel>> GetCoursesByUserId(object userId);
    }
}
