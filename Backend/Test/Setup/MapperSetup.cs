using AutoMapper;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using Service.Image;
using Service.Mapper;

namespace Test.Setup
{
    public class MapperSetup
    {
        protected readonly Mock<IImageService> _imageServiceMock;
        protected readonly IMapper _mapper;

        public MapperSetup()
        {
            _imageServiceMock = new Mock<IImageService>();
            var config = new MapperConfiguration(x =>
            {
                x.AddProfile(new MappingProfile(_imageServiceMock.Object));
            }, NullLoggerFactory.Instance);
            _mapper = config.CreateMapper();
        }
    }
}
