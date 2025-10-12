namespace Domain.Model
{
    public class MailLog
    {
        public long Id { get; set; }
        public required string From { get; set; }
        public required string Subject { get; set; }
        public DateTime DateSent { get; set; }
    }
}
