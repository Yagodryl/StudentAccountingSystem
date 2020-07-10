using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Areas.Student.ViewModels
{
    public class ProfileModel
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public string Image { get; set; }
        public string Email { get; set; }
    }

    public class CourseModel
    {
        public long Id { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public string Description { get; set; }
    }
    public class CourseInfoModel
    {
        public string Description { get; set; }
        public string ShortDescription { get; set; }
        public string Title { get; set; }
        public string Image { get; set; }
        public bool IsSubscribed { get; set; } = false;
        public string StartDate { get; set; }
    }
    public class SubscribeModel
    {
        public string StudyDate { get; set; }
        public string CourseId { get; set; }
    }
}
