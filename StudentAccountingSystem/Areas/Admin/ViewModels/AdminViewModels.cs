using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Areas.Admin.ViewModels
{
    public class CourseViewModel
    {
        
        public string Name { get; set; }
        public string ShortDescription { get; set; }
        public IFormFile Image { get; set; }
        public string FullDescription { get; set; }

    }

    public class FilterViewModel
    {
        public int Current { get; set; }
        public int PageSize { get; set; }
        public string Field { get; set; }
        public string Order { get; set; }
        public string SearchFirstName { get; set; }
        public string SearchLastName { get; set; }
    }

    public class StudentCoursesModel
    {
        public string Name { get; set; }
        public string StartDate { get; set; }
    }

    public class StudentViewModel
    {
        public Guid Id { get; set; }
        public Guid Key { get; set; }
        public string RegisterDate { get; set; }
        public string Age { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public ICollection<StudentCoursesModel> StudentCourses { get; set; }
    }

    public class EditStudentProfileModel
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
    }


    public class PageStudentItemModel
    {
        public int TotalCount { get; set; }
        public int CurrentPage { get; set; }
        public List<StudentViewModel> Students { get; set; }
    }

}
