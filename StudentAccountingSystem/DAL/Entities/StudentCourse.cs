using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.DAL.Entities
{
    public class StudentCourse
    {
        public Guid StudentProfileId { get; set; }
        public StudentProfile StudentProfile { get; set; }
 
        public Guid CourseId { get; set; }
        public Course Course { get; set; }

        public DateTime StartDate { get; set; }
    }
}
