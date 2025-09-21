using AutoMapper;
using Domain.Model;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using Repository.Interface;
using Service.Mapper;
using Service.Query.GetAgencies;
using Test.Builder;

namespace Test.ServiceTests
{
    public class GetAgenciesQueryHandlerTest
    {
        private readonly Mock<IAgencyRepository> _agencyRepositoryMock;
        private readonly IMapper _mapper;
        private readonly GetAgenciesQueryHandler sut;

        public GetAgenciesQueryHandlerTest()
        {
            _agencyRepositoryMock = new Mock<IAgencyRepository>();
            var config = new MapperConfiguration(x =>
            {
                x.AddProfile<MappingProfile>();
            }, NullLoggerFactory.Instance);
            _mapper = config.CreateMapper();
            sut = new GetAgenciesQueryHandler(_agencyRepositoryMock.Object, _mapper);
        }

        [Fact]
        public async void TestResultData()
        {
            //arrange
            var query = new GetAgenciesQuery();

            var agency = new AgencyBuilder().Build();

            _agencyRepositoryMock.Setup(x => x.GetAll()).Returns(new List<Agency>() { agency });

            //act
            var result = await sut.Handle(query, It.IsAny<CancellationToken>());

            //assert
            var agencyResponse = result.Data?.First();

            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.Equal(agency.Id, agencyResponse?.Id);
            Assert.Equal(agency.Name, agencyResponse?.Name);
            Assert.Equal(agency.Description, agencyResponse?.Description);
            Assert.Equal(agency.Country, agencyResponse?.Country);
            _agencyRepositoryMock.Verify(x => x.GetAll(), Times.Once);
        }
    }
}
