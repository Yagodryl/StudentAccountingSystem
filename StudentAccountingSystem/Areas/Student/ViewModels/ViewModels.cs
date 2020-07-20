using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text.Json.Serialization;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Areas.Student.ViewModels
{
    public class ProfileModel
    {
        public Guid Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Image { get; set; }
        public string Email { get; set; }
        public string Birthday { get; set; }
    }

    public class CourseModel
    {
        [Required]
        public Guid Id { get; set; }

        [Required(AllowEmptyStrings = true)]
        [JsonPropertyName("title")]
        public string Name { get; set; }

        [Required(AllowEmptyStrings = true)]
        public string Image { get; set; }

        [Required(AllowEmptyStrings = true)]
        [JsonPropertyName("description")]
        public string ShortDescription { get; set; }
    }
    public class CourseInfoModel
    {
        [Required]
        public Guid Id { get; set; }
       
        [Required(AllowEmptyStrings = true)]
        public string Description { get; set; }      
      
        [Required(AllowEmptyStrings = true)]
        public string ShortDescription { get; set; }
      
        [Required(AllowEmptyStrings = true)]
        public string Title { get; set; }
     
        [Required(AllowEmptyStrings = true)]
        public string Image { get; set; }
     
        public bool IsSubscribed { get; set; } = false;

        public string StartDate { get; set; } = string.Empty;
    }
    public class SubscribeModel
    {
        public string StudyDate { get; set; }
        public string CourseId { get; set; }
    }
}
