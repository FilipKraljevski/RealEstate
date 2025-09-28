using Domain.Model;
using Moq;
using Repository.Interface;
using Service.Query.GetAgencies;
using Test.Builder;
using Test.Setup;

namespace Test.ServiceTests
{
    public class GetAgenciesQueryHandlerTest : MapperSetup
    {
        private readonly Mock<IAgencyRepository> _agencyRepositoryMock;
        private readonly GetAgenciesQueryHandler sut;

        public GetAgenciesQueryHandlerTest()
        {
            _agencyRepositoryMock = new Mock<IAgencyRepository>();
            sut = new GetAgenciesQueryHandler(_agencyRepositoryMock.Object, _mapper);
        }

        [Fact]
        public async void TestResultData()
        {
            //arrange
            var base64 = "base64";

            var query = new GetAgenciesQuery();

            var agency = new AgencyBuilder()
                .Build();

            _agencyRepositoryMock.Setup(x => x.GetAll()).Returns(new List<Agency>() { agency });

            _imageServiceMock.Setup(x => x.Get(It.IsAny<Guid>())).Returns(base64);

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
            Assert.Equal(base64, agencyResponse?.ProfilePicture);
            _agencyRepositoryMock.Verify(x => x.GetAll(), Times.Once);
            _imageServiceMock.Verify(x => x.Get(It.IsAny<Guid>()), Times.Once);
        }
    }
}
