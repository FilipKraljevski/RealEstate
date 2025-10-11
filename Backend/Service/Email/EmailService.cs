using MailKit.Net.Smtp;
using MailKit.Security;
using MimeKit;

namespace Service.Email
{
    public class EmailService : IEmailService
    {
        public readonly EmailSettings emailSettings;

        public EmailService(EmailSettings emailSettings)
        {
            this.emailSettings = emailSettings;
        }

        public void Send(string toEmail, string subject, string body)
        {
            var email = new MimeMessage();
            email.From.Add(new MailboxAddress(emailSettings.EmailDisplayName, emailSettings.SmtpUserName));
            email.To.Add(new MailboxAddress(toEmail, toEmail));
            email.Subject = subject;
            email.Body = new TextPart(MimeKit.Text.TextFormat.Plain) { Text = body };

            using var smtp = new SmtpClient();
            var socketOptions = emailSettings.EnableSsl ? SecureSocketOptions.StartTls : SecureSocketOptions.Auto;
            smtp.Connect(emailSettings.SmtpServer, emailSettings.SmtpServerPort, socketOptions);
            smtp.Authenticate(emailSettings.SmtpUserName, emailSettings.SmtpPassword);
            smtp.Send(email);
            smtp.Disconnect(true);
        }
    }
}
