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
}
