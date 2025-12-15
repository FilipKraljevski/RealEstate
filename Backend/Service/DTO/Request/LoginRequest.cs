namespace Service.DTO.Request
{
    public class LoginRequest
    {
        public required string Username { get; set; }
        public string Password { get; set; }
        public Guid CodeId { get; set; }
        public string? Code { get; set; }
    }
}
