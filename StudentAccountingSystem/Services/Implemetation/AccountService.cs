using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using StudentAccountingSystem.Areas.Admin.ViewModels;
using StudentAccountingSystem.Areas.Student.ViewModels;
using StudentAccountingSystem.DAL.Entities;
using StudentAccountingSystem.Helpers;
using StudentAccountingSystem.Repositories;
using StudentAccountingSystem.Services.Abstraction;

using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Services.Implemetation
{
    public class AccountService : IAccountService
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _env;
        private readonly IAccountRepository _accountRepository;
        private readonly IStudentProfileRepository _studentProfileRepository;
        public AccountService(IAccountRepository accountRepository,
            IStudentProfileRepository studentProfileRepository,
            IConfiguration configuration,
            IWebHostEnvironment env)
        {
            _accountRepository = accountRepository;
            _studentProfileRepository = studentProfileRepository;
            _configuration = configuration;
            _env = env;
        }
        public Task Delete(params object[] keys)
        {
            throw new NotImplementedException();
        }

        public Task<DbUser> Get(params object[] keys)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<DbUser>> GetAll()
        {
            throw new NotImplementedException();
        }

        private static string GetAge(DateTime birthday)
        {
            DateTime now = DateTime.Today;
            int age = now.Year - birthday.Year;
            if (now < birthday.AddYears(age)) age--;

            return age.ToString();
        }

        public async Task<PageStudentItemModel> GetByFilter(FilterViewModel filter)
        {
            var query = _studentProfileRepository.GetAll();

            if (!String.IsNullOrEmpty(filter.SearchFirstName))
                query = query.Where(s => s.FirstName.ToUpper().Contains(filter.SearchFirstName.ToUpper()));

            if (!String.IsNullOrEmpty(filter.SearchLastName))
                query = query.Where(s => s.LastName.ToUpper().Contains(filter.SearchLastName.ToUpper()));

            int totalCount = query.Count();

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
                case "age":

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
            var items = await query.Select(s => new StudentViewModel
            {
                Id = s.Id,
                Key = s.Id,
                Email = s.User.Email,
                FirstName = s.FirstName,
                LastName = s.LastName,
                Age = GetAge(s.Birthday),
                RegisterDate = s.RegisterDate.ToShortDateString(),
                StudentCourses = s.StudentCourses.Select(sc => new StudentCoursesModel 
                    {
                        Name = sc.Course.Name,
                        StartDate = sc.StartDate.ToShortDateString()
                    }).ToList()
            })
                .Skip((filter.Current - 1) * filter.PageSize)
                .Take(filter.PageSize)
                .ToListAsync();
            var pageStudents = new PageStudentItemModel
            {
                Students = items,
                TotalCount = totalCount,
                CurrentPage = filter.Current
            };
            return pageStudents;
        }

        public Task Insert(DbUser item)
        {
            throw new NotImplementedException();
        }

        public Task Update(DbUser item, object id, byte[] rowVersion)
        {
            throw new NotImplementedException();
        }

        public async Task<ProfileModel> GetStudentProfile(object id)
        {
            var profile = await _accountRepository.GetAll().Select(s => new ProfileModel
            {
                Id = s.Id,
                Name = s.StudentProfile.FirstName + ' ' + s.StudentProfile.LastName,
                Birthday = s.StudentProfile.Birthday.ToString("dd/MM/yyyy"),
                Email = s.Email,
                Image = s.StudentProfile.Image,
            }).SingleOrDefaultAsync(x => x.Id == (Guid)id);
            if (profile != null)
            {
                string source = _configuration.GetValue<string>("StudentUrlImages");

                profile.Image = profile.Image != null ?
                    Path.Combine(source, $"500_{profile.Image}"):
                    Path.Combine(source, $"500_{_configuration.GetValue<string>("DefaultImage")}");
            }
            return profile;
        }

        public async Task<string> ChangeImage(object userId, IFormFile image)
        {
            string img = null;
            var student = await _studentProfileRepository.GetAll().SingleOrDefaultAsync(s=>s.User.Id == (Guid)userId);
            if (student!=null)
            {
                string imageName = student.Image ?? Guid.NewGuid().ToString() + ".jpg";
                string pathSaveImage = InitStaticFiles.CreateImageByFileName(_env, _configuration,
                                                        new string[] { "ImagesPath", "ImagesPathStudent" },
                                                        imageName, image);
                if(pathSaveImage !=null)
                {
                    img = imageName;
                    student.Image = img;
                    _studentProfileRepository.Save();
                }
                else
                {
                    img = student.Image;
                }
            }
            string source = _configuration.GetValue<string>("StudentUrlImages");
            string imagePath = img != null?
                                Path.Combine(source, img):
                                Path.Combine(source, $"500_{_configuration.GetValue<string>("DefaultImage")}");

            return imagePath;
        }

        public async Task CreateStudentProfile(StudentProfile studentProfile)
        {
            await _studentProfileRepository.Insert(studentProfile);
            _studentProfileRepository.Save();
        }
    }
    public interface IAccountService : IDataService<DbUser>
    {
        public Task<PageStudentItemModel> GetByFilter(FilterViewModel filter);
        public Task<ProfileModel> GetStudentProfile(object id);
        public Task<string> ChangeImage(object userId, IFormFile image);
        public Task CreateStudentProfile(StudentProfile studentProfile);
    }
}
