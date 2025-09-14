using AutoMapper;
using Domain.Model;
using Microsoft.Extensions.Logging.Abstractions;
using Moq;
using Repository.Interface;
using Service.Mapper;
using Service.Query.GetAgenciesNames;
using Test.Builder;

namespace Test.ServiceTests
{
    public class GetAgenciesNamesQueryHanlderTest
    {
        private readonly Mock<IAgencyRepository> _agencyRepositoryMock;
        private readonly IMapper _mapper;
        private readonly GetAgenciesNamesQueryHanlder sut;

        public GetAgenciesNamesQueryHanlderTest()
        {
            _agencyRepositoryMock = new Mock<IAgencyRepository>();
            var config = new MapperConfiguration(x =>
            {
                x.AddProfile<MappingProfile>();
            }, NullLoggerFactory.Instance);
            _mapper = config.CreateMapper();
            sut = new GetAgenciesNamesQueryHanlder(_agencyRepositoryMock.Object, _mapper);
        }

        [Fact]
        public async void TestResultData()
        {
            //arrange
            var query = new GetAgenciesNamesQuery();

            var agency = new AgencyBuilder()
                .Build();

            _agencyRepositoryMock.Setup(x => x.GetAll()).Returns(new List<Agency> { agency });

            //act
            var result = await sut.Handle(query, It.IsAny<CancellationToken>());

            //assert
            var agencyResponse = result.Data?.First();

            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.Equal(agency.Id, agencyResponse?.Id);
            Assert.Equal(agency.Name, agencyResponse?.Name);
            _agencyRepositoryMock.Verify(x => x.GetAll(), Times.Once);
        }
    }
}
