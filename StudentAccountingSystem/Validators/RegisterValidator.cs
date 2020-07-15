using FluentValidation;
using StudentAccountingSystem.Areas.Account.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Validators
{
    public class RegisterValidator : AbstractValidator<UserRgisterViewModel>
    {
        public RegisterValidator()
        {
            RuleFor(u => u.FirstName).NotEmpty().WithMessage("Введіть ім'я!");
            RuleFor(u => u.LastName).NotEmpty().WithMessage("Введіть прізвище!");
            RuleFor(u => u.Email).NotEmpty().WithMessage("Введіть Email!");
            RuleFor(u => u.Email).EmailAddress().WithMessage("Не вірний формат пошти!");
            RuleFor(u => u.Birthday).NotEmpty().WithMessage("Введіть дату народження!");
            RuleFor(u => u.Birthday).Custom((date, context) =>
            {
                if (DateTime.Parse(date) > DateTime.Now)
                {
                    context.AddFailure("Дата народження не дійсна!");
                }
            });

            RuleFor(u => u.Password).NotEmpty().WithMessage("Введіть пароль!");
            RuleFor(u => u.Password).Matches(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,15}$")
                .WithMessage("Пароль повинен містити від 6-ти до 15-ти символів, цифри та латинськи літери!");
        }
    }
}
