using Domain.Model;
using Moq;
using Repository.Interface;
using Service.Query.GetEstateDetails;
using Test.Builder;
using Test.Setup;

namespace Test.ServiceTests
{
    public class GetEstateDetailsQueryHandlerTest : MapperSetup
    {
        private readonly Mock<IEstateRepository> _estateRepository;
        private readonly GetEstateDetailsQueryHandler sut;

        public GetEstateDetailsQueryHandlerTest()
        {
            _estateRepository = new Mock<IEstateRepository>();
            sut = new GetEstateDetailsQueryHandler(_estateRepository.Object, _mapper);
        }

        [Fact]
        public async void WhenNoEstateIdProvided_ReturnError()
        {
            //arrange
            var query = new GetEstateDetailsQuery();

            //act
            var result = await sut.Handle(query, It.IsAny<CancellationToken>());

            //assert
            Assert.Equal(500, result.StatusCode);
            Assert.Equal("Error: Estate id not provided or empty", result.Message);
        }

        //Not found Estate
        [Fact]
        public async void WhenNoEstateFound_ReturnNotFound()
        {
            //arrange
            var estateId = Guid.NewGuid();

            var query = new GetEstateDetailsQuery() { EstateId = estateId };

            //act
            var result = await sut.Handle(query, It.IsAny<CancellationToken>());

            //assert
            Assert.Equal(404, result.StatusCode);
            Assert.Equal("Not Found: Estate does not exist", result.Message);
        }

        //TestResult
        [Fact]
        public async void TestResultData()
        {
            //arrange
            var estateId = Guid.NewGuid();
            var base64 = "base64";

            var query = new GetEstateDetailsQuery() { EstateId = estateId };

            var estate = new EstateBuilder()
                .WithAdditionalEstateInfo(new List<AdditionalEstateInfo>() { new AdditionalEstateInfoBuilder().Build() })
                .Build();

            var image = new Images { Id = Guid.NewGuid(), Name = "Test", Estate = estate };
            estate.Images =  new List<Images> { image };

            _estateRepository.Setup(x => x.Get(estateId)).Returns(estate);

            _imageServiceMock.Setup(x => x.Get(It.IsAny<Guid>())).Returns(base64);

            //act
            var result = await sut.Handle(query, It.IsAny<CancellationToken>());

            //assert
            var estateResponse = result.Data;

            Assert.NotNull(result);
            Assert.Equal(200, result.StatusCode);
            Assert.Equal(estate.Id, estateResponse?.Id);
            Assert.Equal(estate.Title, estateResponse?.Title);
            Assert.Equal(estate.Description, estateResponse?.Description);
            Assert.Equal(estate.EstateType, estateResponse?.EstateType);
            Assert.Equal(estate.PublishedDate.ToString("g"), estateResponse?.PublishedDate);
            Assert.Equal(estate.Country, estateResponse?.Country);
            Assert.Equal(estate.City.Id, estateResponse?.City.Id);
            Assert.Equal(estate.City.Name, estateResponse?.City.Name);
            Assert.Equal(estate.Municipality, estateResponse?.Municipality);
            Assert.Equal(estate.Area, estateResponse?.Area);
            Assert.Equal(estate.YearOfConstruction, estateResponse?.YearOfConstruction);
            Assert.Equal(estate.Rooms, estateResponse?.Rooms);
            Assert.Equal(estate.Floor, estateResponse?.Floor);
            Assert.Equal(estate.PurchaseType, estateResponse?.PurchaseType);
            Assert.Equal(estate.Price, estateResponse?.Price);
            Assert.Equal(estate.AdditionalEstateInfo?.First().Name, estateResponse?.AdditionalEstateInfo?.First().Name);
            Assert.Equal(estate.Agency.Id, estateResponse?.Agency.Id);
            Assert.Equal(estate.Agency.Name, estateResponse?.Agency.Name);
            Assert.Equal(base64, estateResponse?.Images?.FirstOrDefault()?.Content);
            _estateRepository.Verify(x => x.Get(estateId), Times.Once);
            _imageServiceMock.Verify(x => x.Get(It.IsAny<Guid>()), Times.Once);
        }
    }
}
