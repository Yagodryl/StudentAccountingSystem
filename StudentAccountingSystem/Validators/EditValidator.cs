using FluentValidation;
using StudentAccountingSystem.Areas.Admin.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Validators
{
    public class EditValidator:AbstractValidator<EditStudentProfileModel>
    {
        public EditValidator()
        {
            RuleFor(x => x.Email).NotEmpty().WithMessage("Введіть Email!");
            RuleFor(u => u.Email).EmailAddress().WithMessage("Не вірний формат пошти!");
            RuleFor(u => u.FirstName).NotEmpty().WithMessage("Введіть ім'я!");
            RuleFor(u => u.LastName).NotEmpty().WithMessage("Введіть прізвище!");
            RuleFor(u => u.Id).NotEmpty().WithMessage("No ID!");

        }

    }
}
