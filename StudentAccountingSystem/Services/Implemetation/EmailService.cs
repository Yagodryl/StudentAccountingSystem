using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace StudentAccountingSystem.Services.Implemetation
{
    public class EmailService : IEmailService
    {
        public async Task SendEmailAsync(string recipient, string subject, string message)
        {
            MailAddress from = new MailAddress("dimi4kizuyk@gmail.com", "SAS");
            MailAddress to = new MailAddress(recipient);
            MailMessage m = new MailMessage(from, to);
            m.Subject = subject;
            m.Body = message;
            SmtpClient smtp = new SmtpClient("smtp.gmail.com", 587);
            smtp.Credentials = new NetworkCredential("dimi4kizuyk@gmail.com", "SSyg313567");
            smtp.EnableSsl = true;
            await smtp.SendMailAsync(m);
        }
      
    }
    public interface IEmailService
    {

        public Task SendEmailAsync(string recipient, string subject, string message);

    }
}
