using AutoMapper;
using Domain.Enum;
using Domain.Model;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using Repository.Interface;
using Service.DTO.Request;
using Service.Mapper;
using Service.Query.GetEstates;
using System.Drawing;
using Test.Builder;

namespace Test.ServiceTests
{
    public class GetEstatesQueryHandlerTest
    {
        private readonly Mock<IEstateRepository> _estateRepository;
        private readonly IMapper _mapper;
        private readonly GetEstatesQueryHandler sut;

        public GetEstatesQueryHandlerTest()
        {
            _estateRepository = new Mock<IEstateRepository>();
            var config = new MapperConfiguration(x =>
            {
                x.AddProfile<MappingProfile>();
            }, NullLoggerFactory.Instance);
            _mapper = config.CreateMapper();
            sut = new GetEstatesQueryHandler(_estateRepository.Object, _mapper);
        }

        [Theory]
        [InlineData(PurchaseType.Rent, null, null, null, null, null, null, null, null, 1)]
        [InlineData(null, EstateType.House, null, null, null, null, null, null, null, 1)]
        [InlineData(null, null, Country.Macedonia, null, null, null, null, null, null, 9)]
        [InlineData(null, null, null, true, null, null, null, null, null, 1)]
        [InlineData(null, null, null, null, true, null, null, null, null, 1)]
        [InlineData(null, null, null, null, null, (long)10, null, null, null, 8)]
        [InlineData(null, null, null, null, null, null, (long)10, null, null, 2)]
        [InlineData(null, null, null, null, null, null, null, (long)100, null, 8)]
        [InlineData(null, null, null, null, null, null, null, null, (long)100, 2)]
        public async void TestFilters(PurchaseType? purchaseType, EstateType? estateType, Country? country, bool? hasCityId, bool? hasAgencyId, long? fromArea, long? toArea, long? fromPrice, long? toPrice, int count)
        {
            //arange
            Guid? cityId = hasCityId.HasValue && hasCityId.Value ? Guid.NewGuid() : null;
            Guid? agencyId = hasAgencyId.HasValue && hasAgencyId.Value ? Guid.NewGuid() : null;

            var query = new GetEstatesQuery() { 
                Filters = new GetEstateFiltersRequest()
                {
                    PurchaseType = purchaseType,
                    EstateType = estateType,
                    Country = country,
                    CityId = cityId,
                    AgencyId = agencyId,
                    FromArea = fromArea,
                    ToArea = toArea,
                    FromPrice = fromPrice,
                    ToPrice = toPrice
                },
                Page = 1,
                Size = 10,
            };

            var city = new CityBuilder()
                .WithId(cityId ?? Guid.Empty)
                .Build();

            var agency = new AgencyBuilder()
                .WithId(agencyId ?? Guid.Empty)
                .Build();

            var estate1 = new EstateBuilder()
                .WithPurchaseType(purchaseType.GetValueOrDefault())
                .Build();
            var estate2 = new EstateBuilder()
                .WithEstateType(estateType.GetValueOrDefault())
                .Build();
            var estate3 = new EstateBuilder()
                .WithCountry(country.GetValueOrDefault())
                .Build();
            var estate4 = new EstateBuilder()
                .WithCity(city)
                .Build();
            var estate5 = new EstateBuilder()
                .WithAgency(agency)
                .Build();
            var estate6 = new EstateBuilder()
                .WithArea(fromArea.GetValueOrDefault())
                .Build();
            var estate7 = new EstateBuilder()
                .WithArea(toArea.GetValueOrDefault())
                .Build();
            var estate8 = new EstateBuilder()
                .WithPrice(fromPrice.GetValueOrDefault())
                .Build();
            var estate9 = new EstateBuilder()
                .WithPrice(toPrice.GetValueOrDefault())
                .Build();

            _estateRepository.Setup(x => x.GetAsQueryable()).Returns(new List<Estate>{ estate1, estate2, estate3, estate4, estate5, estate6, estate7, estate8, estate9 }.AsQueryable());

            //act
            var result = await sut.Handle(query, It.IsAny<CancellationToken>());

            //assert
            var estateResponse = result.Data?.First();

            Assert.NotNull(estateResponse);
            Assert.Equal(count, result.Data?.Count);
        }

        [Theory]
        [InlineData(1, 10, 10)]
        [InlineData(1, 20, 20)]
        [InlineData(2, 10, 10)]
        [InlineData(2, 20, 10)]
        public async void TestPagination(int page, int size, int count)
        {
            //arrange
            var query = new GetEstatesQuery()
            {
                Filters = new GetEstateFiltersRequest(),
                Page = page,
                Size = size
            };

            List<Estate> estates = new List<Estate>();

            for (int i = 0; i < 30; i++) 
            {
                estates.Add(new EstateBuilder()
                    .Build());
            };

            _estateRepository.Setup(x => x.GetAsQueryable()).Returns(estates.AsQueryable());

            //act
            var result = await sut.Handle(query, It.IsAny<CancellationToken>());

            //assert
            Assert.Equal(count, result.Data?.Count);
        }

        [Fact]
        public async void TestResultData()
        {
            //arrange
            var query = new GetEstatesQuery() 
            {
                Filters = new GetEstateFiltersRequest(),
                Page = 1,
                Size = 10
            };

            var estate = new EstateBuilder().Build();
            
            _estateRepository.Setup(x => x.GetAsQueryable()).Returns(new List<Estate> { estate }.AsQueryable());

            //act
            var result = await sut.Handle(query, It.IsAny<CancellationToken>());

            //assert
            var estateResponse = result.Data?.First();
            var location = estate.Municipality + ", " + estate.City.Name;

            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.Equal(estate.Id, estateResponse?.Id);
            Assert.Equal(estate.Title, estateResponse?.Title);
            Assert.Equal(estate.PurchaseType, estateResponse?.PurchaseType);
            Assert.Equal(estate.EstateType, estateResponse?.EstateType);
            Assert.Equal(estate.Country, estateResponse?.Country);
            Assert.Equal(location, estateResponse?.Location);
            Assert.Equal(estate.Area, estateResponse?.Area);
            Assert.Equal(estate.Price, estateResponse?.Price);
            Assert.Equal(estate.Description, estateResponse?.Description);
            Assert.Equal(estate.Agency.Id, estateResponse?.Agency.Id);
            Assert.Equal(estate.Agency.Name, estateResponse?.Agency.Name);
            //Assert.Equal(); -- Image Test
            _estateRepository.Verify(x => x.GetAsQueryable(), Times.Once);
        }
    }
}
