using FluentValidation;
using StudentAccountingSystem.Areas.Student.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Validators
{
    public class SubscribeCourseValidator: AbstractValidator<SubscribeModel>
    {
        public SubscribeCourseValidator()
        {
            RuleFor(s => s.StudyDate).NotEmpty().WithMessage("Оберіть дату!");
            RuleFor(s => s.StudyDate).Custom((date, context)=> 
            {
                if (DateTime.Parse(date)<DateTime.Now)
                {
                    context.AddFailure("Ви не можите обрати минулу дату!");
                }
            });

            RuleFor(s => s.CourseId).NotEmpty();
        }
    }
}
