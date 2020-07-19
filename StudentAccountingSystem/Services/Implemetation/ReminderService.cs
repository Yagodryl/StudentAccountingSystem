using Microsoft.EntityFrameworkCore;
using StudentAccountingSystem.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Services.Implemetation
{
    public class ReminderService : IReminderService
    {
        private readonly IEmailService _emailService;
        private readonly IStudentCourseRepository _studentCourseRepository;

        private DateTime today = DateTime.Today;
        public ReminderService(IEmailService emailService,
            IStudentCourseRepository studentCourseRepository)
        {
            _studentCourseRepository = studentCourseRepository;
            _emailService = emailService;
        }

        public async Task RemindDaily()
        {
                var items = await _studentCourseRepository.GetAll().Where(x => x.StartDate.Date ==
                                today.AddDays(1).Date)
                                .Select(x => new
                                {
                                    Email = x.StudentProfile.User.Email,
                                    //StartDate = x.StartDate.ToShortDateString(),
                                    Name = x.StudentProfile.LastName + " " + x.StudentProfile.FirstName
                                }).ToListAsync();
                foreach (var item in items)
                {
                    await _emailService.SendEmailAsync(item.Email,
                         "Завтра починаються заняття!",
                         $"Шановний(а) {item.Name}, у вас завтра починаються заняття!");
                }

        }

        public async Task RemindMothly()
        {
            var items = await _studentCourseRepository.GetAll().Where(x => x.StartDate.ToShortDateString() ==
                            today.AddMonths(1).ToShortDateString())
                            .Select(x => new
                            {
                                Email = x.StudentProfile.User.Email,
                                StartDate = x.StartDate.ToShortDateString(),
                                Name = x.StudentProfile.LastName + " " + x.StudentProfile.FirstName
                            }).ToListAsync();
            foreach (var item in items)
            {
                await _emailService.SendEmailAsync(item.Email,
                     "Через місяць починаються заняття!",
                     $"Шановний(а) {item.Name}, через місяць {item.StartDate} починаються заняття!");
            }
        }

        public async Task RemindWeekly()
        {
            var items = await _studentCourseRepository.GetAll().Where(x => x.StartDate.ToShortDateString() ==
                            today.AddDays(7).ToShortDateString())
                            .Select(x => new
                            {
                                Email = x.StudentProfile.User.Email,
                                StartDate = x.StartDate.ToShortDateString(),
                                Name = x.StudentProfile.LastName + " " + x.StudentProfile.FirstName
                            }).ToListAsync();
            foreach (var item in items)
            {
                await _emailService.SendEmailAsync(item.Email,
                     "Через тиждень починаються заняття!",
                     $"Шановний(а) {item.Name}, через тиждень {item.StartDate} починаються заняття!");
            }
        }
    }
    public interface IReminderService
    {
        public Task RemindDaily();
        public Task RemindWeekly();
        public Task RemindMothly();

    }
}
