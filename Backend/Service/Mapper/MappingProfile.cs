using AutoMapper;
using AutoMapper.EquivalencyExpression;
using Domain.Model;
using Service.DTO.Request;
using Service.DTO.Response;
using Service.Image;

namespace Service.Mapper
{
    public class MappingProfile : Profile
    {
        private readonly IImageService imageService;
        public MappingProfile(IImageService imageService) 
        {
            this.imageService = imageService;
            CreateMap<City, GetCityResponse>();
            CreateMap<Agency, GetAgencyNameResponse>();
            CreateMap<Estate, GetEstateResponse>()
                .ForMember(d => d.Location, opt => opt.MapFrom(s => s.Municipality + ", " + s.City.Name))
                .ForMember(d => d.Image, opt => opt.MapFrom(s => this.imageService.Get(s.Images.FirstOrDefault().Id)));
            CreateMap<Estate, GetEstateDetailsResponse>()
                .ForMember(d => d.PublishedDate, opt => opt.MapFrom(s => s.PublishedDate.ToString("g")))
                .ForMember(d => d.City, opt => opt.MapFrom(s => new CityResponse { Id = s.City.Id, Name = s.City.Name }))
                .ForMember(d => d.AdditionalEstateInfo, opt => opt.MapFrom(s => s.AdditionalEstateInfo.Select(x => new AdditionalEstateInfoResponse { Id = x.Id, Name = x.Name })))
                .ForMember(d => d.Images, opt => opt.MapFrom(s => s.Images.Select(x => new ImageResponse { Id = x.Id, Content = this.imageService.Get(x.Id) })));
            CreateMap<Agency, GetAgencyResponse>()
                .ForMember(d => d.ProfilePicture, opt => opt.MapFrom(s => this.imageService.Get(s.ProfilePictureId)));
            CreateMap<Agency, GetAgencyDetailsResponse>()
                .ForMember(d => d.NumberOfEstates, opt => opt.MapFrom(s => s.Estates.Count))
                .ForMember(d => d.Telephones, opt => opt.MapFrom(s => s.Telephones.Select(x => new TelephoneResponse { Id = x.Id, PhoneNumber = x.PhoneNumber })))
                .ForMember(d => d.ProfilePicture, opt => opt.MapFrom(s => this.imageService.Get(s.ProfilePictureId)));
            CreateMap<TelephoneRequest, Telephone>()
                .EqualityComparison((dto, entity) => dto.Id == entity.Id);
            CreateMap<SaveAgencyRequest, Agency>()
                .ForMember(d => d.Telephones, opt => opt.MapFrom(s => s.Telephones));
            CreateMap<AdditionalEstateInfoRequest, AdditionalEstateInfo>()
                .EqualityComparison((dto, entity) => dto.Id == entity.Id);
            CreateMap<SaveEstateRequest, Estate>()
                .ForMember(d => d.City, opt => opt.Ignore())
                .ForMember(d => d.Images, opt => opt.Ignore())
                .ForMember(d => d.AdditionalEstateInfo, opt => opt.MapFrom(s => s.AdditionalEstateInfo));
        }
    }
}
