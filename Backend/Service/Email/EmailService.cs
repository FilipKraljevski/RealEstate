using Domain.Model;
using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;
using System.Xml.Linq;

namespace Service.Email
{
    public class EmailService : IEmailService
    {
        private readonly EmailSettings settings;

        public EmailService(IOptions<EmailSettings> options)
        {
            settings = options.Value;
        }

        public void SendReceivedEmail(string name, string toEmail)
        {
            var subject = "Email Received";
            var body = $"Hello {name},\nYour email has been sent to us. We will look at it as soon as possible.\nThank you";

            var message = BuildMessage(name, toEmail, subject, body);

            Send(message);
        }

        public void SendEmail(string subject, string body)
        {
            var message = BuildMessage(settings.EmailDisplayName, settings.EmailDisplayName, subject, body);

            Send(message);
        }

        public void SendEmailToAgencies(List<Agency> toAgencies, string subject, string body)
        {
            var message = BuildMessageForAgencies(toAgencies, subject, body);

            Send(message);
        }

        private MimeMessage BuildMessage(string toName, string toEmail, string subject, string body)
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(settings.EmailDisplayName, settings.SmtpUserName));
            email.To.Add(new MailboxAddress(toName, toEmail));
            email.Subject = subject;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Plain) { Text = body };

            return email;
        }

        private MimeMessage BuildMessageForAgencies(List<Agency> toAgencies, string subject, string body)
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(settings.EmailDisplayName, settings.SmtpUserName));
            email.Subject = subject;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Plain) { Text = body };

            foreach(var agency in toAgencies)
            {
                email.To.Add(new MailboxAddress(agency.Name, agency.Email));
            }

            return email;
        }

        private void Send(MimeMessage message)
        {
            using var smtp = new SmtpClient();
            var socketOptions = settings.EnableSsl ? SecureSocketOptions.StartTls : SecureSocketOptions.Auto;

            smtp.Connect(settings.SmtpServer, settings.SmtpServerPort, socketOptions);
            smtp.Authenticate(settings.SmtpUserName, settings.SmtpPassword);
            smtp.Send(message);
            smtp.Disconnect(true);
        }
    }
}
