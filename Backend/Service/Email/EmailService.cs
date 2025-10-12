using MailKit.Net.Smtp;
using MailKit.Security;
using Microsoft.Extensions.Options;
using MimeKit;

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

        public void SendEmail(string name, string toEmail, string subject, string body)
        {
            var message = BuildMessage(settings.EmailDisplayName, settings.EmailDisplayName, subject, body, name, toEmail);

            Send(message);
        }

        private MimeMessage BuildMessage(string toName, string toEmail, string subject, string body, string ccName = "", string ccEmail = "")
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(settings.EmailDisplayName, settings.SmtpUserName));
            email.To.Add(new MailboxAddress(toName, toEmail));
            email.Subject = subject;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Plain) { Text = body };

            if(ccName != string.Empty && ccEmail != string.Empty)
            {
                email.Cc.Add(new MailboxAddress(ccName, ccEmail));
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
