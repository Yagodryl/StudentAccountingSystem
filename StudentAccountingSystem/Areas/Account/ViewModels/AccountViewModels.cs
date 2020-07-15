using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Areas.Account.ViewModels
{
    public class UserLoginViewModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
    }

    public class UserRgisterViewModel
    {
        public string Email { get; set; }
        public string Password { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Birthday { get; set; }
    }
}
