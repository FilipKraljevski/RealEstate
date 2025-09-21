using Domain.Enum;
using Domain.Model;

namespace Service.DTO.Response
{
    public class GetAgencyResponse
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public Country Country { get; set; }
        public byte[]? ProfilePicture { get; set; }
    }
}
