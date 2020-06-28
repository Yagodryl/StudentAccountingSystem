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
        public long Id { get; set; }
        public virtual DbUser User { get; set; }

        [Required, StringLength(200)]
        public string FullName { get; set; }

        [StringLength(150)]
        public string Image { get; set; }


    }
}
