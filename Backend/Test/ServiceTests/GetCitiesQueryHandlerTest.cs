using AutoMapper;
using Domain.Enum;
using Domain.Model;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using Repository.Interface;
using Service.Mapper;
using Service.Query.GetCities;
using Test.Builder;

namespace Test.ServiceTests
{
    public class GetCitiesQueryHandlerTest
    {
        private readonly Mock<ICityRepository> _cityRepositoryMock;
        private readonly IMapper _mapper;
        private readonly GetCitiesQueryHandler sut;

        public GetCitiesQueryHandlerTest()
        {
            _cityRepositoryMock = new Mock<ICityRepository>();
            var config = new MapperConfiguration(x => 
            { 
                x.AddProfile<MappingProfile>(); 
            }, NullLoggerFactory.Instance);
            _mapper = config.CreateMapper();
            sut = new GetCitiesQueryHandler(_cityRepositoryMock.Object, _mapper);
        }

        [Fact]
        public async void WhenCountryProvided_ExecuteGetAllByCountry()
        {
            //arange
            var query = new GetCitiesQuery { Country = Country.Macedonia };

            var city = new CityBuilder()
                .Build();

            _cityRepositoryMock.Setup(x => x.GetByCountry(Country.Macedonia)).Returns(new List<City>() { city });

            //act
            var result = await sut.Handle(query, It.IsAny<CancellationToken>());

            //assert
            _cityRepositoryMock.Verify(x => x.GetByCountry(Country.Macedonia), Times.Once);
        }

        [Fact]
        public async void WhenNoCountryProvided_ExecuteGetAll()
        {
            //arange
            var query = new GetCitiesQuery();

            var city = new CityBuilder()
                .Build();

            _cityRepositoryMock.Setup(x => x.GetAll()).Returns(new List<City>() { city });

            //act
            var result = await sut.Handle(query, It.IsAny<CancellationToken>());

            //assert
            _cityRepositoryMock.Verify(x => x.GetAll(), Times.Once);
        }

        [Fact]
        public async void TestResultData()
        {
            //arange
            var query = new GetCitiesQuery();

            var city = new CityBuilder()
                .Build();

            _cityRepositoryMock.Setup(x => x.GetAll()).Returns(new List<City>() { city });

            //act
            var result = await sut.Handle(query, It.IsAny<CancellationToken>());

            //assert
            var cityResponse = result.Data?.First();

            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.Equal(city.Id, cityResponse?.Id);
            Assert.Equal(city.Name, cityResponse?.Name);
        }
    }
}
