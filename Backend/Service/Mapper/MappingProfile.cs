using AutoMapper;
using Domain.Model;
using Service.DTO.Response;

namespace Service.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<City, GetCityResponse>().ReverseMap();
        }
    }
}
