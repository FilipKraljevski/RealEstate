using Domain.Enum;
using Domain.Model;

namespace Service.DTO.Response
{
    public class GetAgencyDetailsResponse
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public Country Country { get; set; }
        public required string Email { get; set; }
        public string? ProfilePicture { get; set; }
        public Guid? ProfilePictureId { get; set; }
        public int NumberOfEstates { get; set; }
        public List<TelephoneResponse>? Telephones { get; set; }
    }

    public class TelephoneResponse
    {
        public Guid Id { get; set; }
        public required string PhoneNumber { get; set; }
    }
}
