using Domain.Model;

namespace Service.Email
{
    public interface IEmailService
    {
        void SendReceivedEmail(string name, string toEmail);
        void SendEmail(string subject, string body);
        void SendEmailToAgencies(List<Agency> toAgencies, string subject, string body);
    }
}
