using Domain.Enum;

namespace Service.DTO.Request
{
    public class SaveAgencyRequest
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public Country Country { get; set; }
        public required string Email { get; set; }
        public ProfilePictureRequest? ProfilePicture { get; set; }
        public required List<TelephoneRequest> Telephones { get; set; }
    }

    public class ProfilePictureRequest
    {
        public Guid Id { get; set; }
        public byte[]? Content { get; set; }
    }

    public class TelephoneRequest
    {
        public Guid Id { get; set; }
        public required string PhoneNumber { get; set; }
    }
}
