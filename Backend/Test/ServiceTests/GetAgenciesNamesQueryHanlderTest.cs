using Domain.Model;
using Moq;
using Repository.Interface;
using Service.Query.GetAgenciesNames;
using Test.Builder;
using Test.Setup;

namespace Test.ServiceTests
{
    public class GetAgenciesNamesQueryHanlderTest : MapperSetup
    {
        private readonly Mock<IAgencyRepository> _agencyRepositoryMock;
        private readonly GetAgenciesNamesQueryHandler sut;

        public GetAgenciesNamesQueryHanlderTest()
        {
            _agencyRepositoryMock = new Mock<IAgencyRepository>();
            sut = new GetAgenciesNamesQueryHandler(_agencyRepositoryMock.Object, _mapper);
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
