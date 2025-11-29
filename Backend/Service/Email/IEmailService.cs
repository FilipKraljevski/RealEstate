using Domain.Model;
using Service.DTO.Request;

namespace Service.Email
{
    public interface IEmailService
    {
        void SendReceivedEmail(string name, string toEmail);
        void SendEmail(string subject, string body);
        void SendEmailToUser(string toEmail, string subject, string body);
        void SendEmailToAgencies(List<Agency> toAgencies, string subject, string body, List<YourOfferImagesRequest>? attachments);
    }
}
