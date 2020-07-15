using FluentValidation;
using StudentAccountingSystem.Areas.Account.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Validators
{
    public class LoginValidator : AbstractValidator<UserLoginViewModel>
    {
        public LoginValidator()
        {
            RuleFor(u => u.Email).NotEmpty().WithMessage("Введіть Email!");
            RuleFor(u => u.Email).EmailAddress().WithMessage("Не вірний формат пошти!");
            RuleFor(u => u.Password).NotEmpty().WithMessage("Введіть пароль!");
        }
    }
}
