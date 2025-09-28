using Domain.Model;
using Moq;
using Repository.Interface;
using Service.Query.GetAgencyDetails;
using Test.Builder;
using Test.Setup;

namespace Test.ServiceTests
{
    public class GetAgencyDetailsQueryHandlerTest : MapperSetup
    {
        private readonly Mock<IAgencyRepository> _agencyRepositoryMock;
        private readonly GetAgencyDetailsQueryHandler sut;

        public GetAgencyDetailsQueryHandlerTest()
        {
            _agencyRepositoryMock = new Mock<IAgencyRepository>();
            sut = new GetAgencyDetailsQueryHandler(_agencyRepositoryMock.Object, _mapper);
        }

        [Fact]
        public async void WhenNoAgencyIdProvided_ReturnError()
        {
            //arrange
            var query = new GetAgencyDetailsQuery();

            //act
            var result = await sut.Handle(query, It.IsAny<CancellationToken>());

            //assert
            Assert.Equal(500, result.StatusCode);
            Assert.Equal("Error: Agency id not provided or empty", result.Message);
        }

        [Fact]
        public async void WhenNoAgencyFound_ReturnNotFound()
        {
            //arrange
            var agencyId = Guid.NewGuid();

            var query = new GetAgencyDetailsQuery() { AgencyId = agencyId };

            //act
            var result = await sut.Handle(query, It.IsAny<CancellationToken>());

            //assert
            Assert.Equal(404, result.StatusCode);
            Assert.Equal("Not Found: Agency does not exist", result.Message);
        }

        [Fact]
        public async void TestResultData()
        {
            //arrange
            var agencyId = Guid.NewGuid();
            var base64 = "base64";

            var query = new GetAgencyDetailsQuery() { AgencyId = agencyId };

            var estate = new EstateBuilder()
                .Build();

            var telephone = new TelephoneBuilder()
                .Build();

            var agency = new AgencyBuilder()
                .WithEstates(new List<Estate>() { estate })
                .WithTelephones(new List<Telephone> { telephone })
                .Build();

            _agencyRepositoryMock.Setup(x => x.Get(agencyId)).Returns(agency);

            _imageServiceMock.Setup(x => x.Get(agency.ProfilePictureId)).Returns(base64);

            //act
            var result = await sut.Handle(query, It.IsAny<CancellationToken>());

            //assert
            var agencyResponse = result.Data;

            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.Equal(agency.Id, agencyResponse?.Id);
            Assert.Equal(agency.Name, agencyResponse?.Name);
            Assert.Equal(agency.Description, agencyResponse?.Description);
            Assert.Equal(agency.Country, agencyResponse?.Country);
            Assert.Equal(agency.Email, agencyResponse?.Email);
            Assert.Equal(agency.Estates?.Count, agencyResponse?.NumberOfEstates);
            Assert.Equal(agency.Telephones?.First().PhoneNumber, agencyResponse?.Telephones?.First());
            Assert.NotNull(agencyResponse?.ProfilePicture);
            _agencyRepositoryMock.Verify(x => x.Get(agencyId), Times.Once);
            _imageServiceMock.Verify(x => x.Get(agency.ProfilePictureId), Times.Once);
        }
    }
}
