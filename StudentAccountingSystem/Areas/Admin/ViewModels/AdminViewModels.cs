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
        public string Image { get; set; }
        public string FullDescription { get; set; }

    }

    public class FilterViewModel
    {
        public int Current { get; set; }
        public int PageSize { get; set; }

        public string Field { get; set; }
        public string Order { get; set; }


    }

    public class StudentViewModel
    {
        public long Id { get; set; }
        public long Key { get; set; }
        public string RegisterDate { get; set; }
        public string Birthday { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public ICollection<string> StudyDates { get; set; }

    }
}
