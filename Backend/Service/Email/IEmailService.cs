namespace Service.Email
{
    public interface IEmailService
    {
        void SendReceivedEmail(string name, string toEmail);
        void SendEmail(string name, string toEmail, string subject, string body);
    }
}
