using AutoMapper;
using Domain.Model;
using Service.DTO.Response;

namespace Service.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile() 
        {
            CreateMap<City, GetCityResponse>();
            CreateMap<Agency, GetAgencyNameResponse>();
            CreateMap<Estate, GetEstateResponse>()
                .ForMember(d => d.Location, opt => opt.MapFrom(s => s.Municipality + ", " + s.City.Name))
                .ForMember(d => d.Description, opt =>  opt.MapFrom(s => s.Description.Substring(0, 100)));
              //.ForMember(d => d.Image, opt => opt.MapFrom(s => s.Images.FirstOrDefault())); -- Need a function to get Image content from Documents
            CreateMap<Estate, GetEstateDetailsResponse>()
                .ForMember(d => d.City, opt => opt.MapFrom(s => s.City.Name))
                .ForMember(d => d.AdditionalEstateInfo, opt => opt.MapFrom(s => s.AdditionalEstateInfo.Select(x => x.Name)));
              //.ForMember(d => d.Image, opt => opt.MapFrom(s => s.Images.FirstOrDefault())); -- Need a function to get Image content from Documents
            CreateMap<Agency, GetAgencyResponse>();
              //.ForMember(d => d.ProfilePicture, opt => opt.MapFrom(s => s.ProfilePictureId));  -- Need a function to get Image content from Documents
        }
    }
}
