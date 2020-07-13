using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.DAL.Entities
{
    public class Course
    {
        [Key]
        public Guid Id { get; set; }

        [Required, StringLength(255, ErrorMessage = "Назва курсу має бути менше 255 символів!")]
        public string Name { get; set; }
        [StringLength(255)]
        public string Image { get; set; }
        [StringLength(500)]
        public string ShortDescription { get; set; }
       
        [ForeignKey("CourseDescription")]
        public Guid CourseDescriptionId { get; set; }
        public CourseDescription CourseDescription { get; set; }

        public ICollection<StudentCourse> StudentCourses { get; set; }
    }
}
