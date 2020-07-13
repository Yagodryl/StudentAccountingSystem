using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.DAL.Entities
{
    public class StudentProfile
    {
        [Key, ForeignKey("User")]
        public Guid Id { get; set; }
        public virtual DbUser User { get; set; }

        [Required, StringLength(50)]
        public string FirstName { get; set; }
        [Required, StringLength(50)]
        public string LastName { get; set; }
        [Required]
        public DateTime Birthday { get; set; }
        [Required]
        public DateTime RegisterDate { get; set; }
        [StringLength(150)]
        public string Image { get; set; }

        public ICollection<StudentCourse> StudentCourses { get; set; }

    }
}
