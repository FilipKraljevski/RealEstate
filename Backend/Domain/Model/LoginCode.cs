namespace Domain.Model
{
    public class LoginCode
    {
        public Guid Id { get; set; }
        public required string Code { get; set; }
        public DateTime ExpirationDate { get; set; }
    }
}
