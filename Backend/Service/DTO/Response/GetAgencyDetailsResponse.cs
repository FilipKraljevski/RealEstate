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
        public byte[]? ProfilePicture { get; set; }
        public int NumberOfEstates { get; set; }
        public List<string>? Telephones { get; set; }
    }
}
