namespace Service.Email
{
    public class EmailSettings
    {
        public required string SmtpServer { get; set; }
        public required string SmtpUserName { get; set; }
        public required string SmtpPassword { get; set; }
        public int SmtpServerPort { get; set; }
        public bool EnableSsl { get; set; }
        public required string EmailDisplayName { get; set; }
    }
}
