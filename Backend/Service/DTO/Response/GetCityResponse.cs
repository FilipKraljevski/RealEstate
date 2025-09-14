using Domain.Enum;

namespace Service.DTO.Response
{
    public class GetCityResponse
    {
        public Guid Id { get; set; }
        public string? Name { get; set; }
    }
}
