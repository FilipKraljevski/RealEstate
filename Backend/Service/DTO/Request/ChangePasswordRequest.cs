namespace Service.DTO.Request
{
    public class ChangePasswordRequest
    {
        public Guid AgencyId { get; set; }
        public string? OldPassword { get; set; }
        public required string NewPassword { get; set; }
        public required string ConfirmPassword { get; set; }
    }
}
