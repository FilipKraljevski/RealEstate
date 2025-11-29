namespace Service.DTO.Request
{
    public class ContactRequest //: TwoFactorAuth
    {
        public required string Name { get; set; }
        public required string Email { get; set; }
        public required string Subject { get; set; }
        public required string Body { get; set; }
    }
}
