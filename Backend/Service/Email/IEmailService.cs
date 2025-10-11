namespace Service.Email
{
    public interface IEmailService
    {
        void Send(string toEmail, string subject, string body);
    }
}
