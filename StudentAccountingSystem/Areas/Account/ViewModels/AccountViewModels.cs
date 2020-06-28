using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Areas.Account.ViewModels
{
    public class UserLoginViewModel
    {
        [Required(ErrorMessage = "Поле не може бути пустим!"), EmailAddress(ErrorMessage = "Не вірний формат Email!")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Поле не може бути пустим!")]
        public string Password { get; set; }
    }

    public class UserRgisterViewModel
    {
        [Required(ErrorMessage = "Поле не може бути пустим!"), EmailAddress(ErrorMessage = "Не вірний формат Email!")]
        public string Email { get; set; }
        [Required(ErrorMessage = "Поле не може бути пустим!")]
        public string Password { get; set; }
        [Required(ErrorMessage = "Поле не може бути ПІБ!")]
        public string Name { get; set; }
    }
}
