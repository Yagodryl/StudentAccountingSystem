using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.DAL.Entities
{
    public class CourseDescription
    {
        [Key]
        public long Id { get; set; }
        public string Description { get; set; }
        [ForeignKey("Course")]
        public long CourseId { get; set; }
        public Course Course { get; set; }
    }
}
