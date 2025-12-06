namespace Service.DTO.Request
{
    public class LoginRequest
    {
        public required string Email { get; set; }
        public required string Password { get; set; }
        public Guid CodeId { get; set; }
        public string? Code { get; set; }
    }
}
