using Moq;
using Repository.Interface;
using Service.Command.DeleteEstate;
using Test.Builder;

namespace Test.ServiceTests
{
    public class DeleteEstateCommandHandlerTest
    {
        private readonly Mock<IEstateRepository> _estateRepository;
        private readonly DeleteEstateCommandHandler sut;

        public DeleteEstateCommandHandlerTest()
        {
            _estateRepository = new Mock<IEstateRepository>();
            sut = new DeleteEstateCommandHandler(_estateRepository.Object);
        }

        [Fact]
        public async void WhenEsateIdNotProvided_ReturnError()
        {
            //arrange
            var command = new DeleteEstateCommand();

            //act
            var result = await sut.Handle(command, It.IsAny<CancellationToken>());

            //assert
            Assert.Equal(500, result.StatusCode);
            Assert.Equal("Error: Estate id not provided or empty", result.Message);
        }

        [Fact]
        public async void WhenNoEsateFound_ReturnNotFound()
        {
            //arrange
            var estateId = Guid.NewGuid();

            var command = new DeleteEstateCommand() { EstateId = estateId };

            //act
            var result = await sut.Handle(command, It.IsAny<CancellationToken>());

            //assert
            Assert.Equal(404, result.StatusCode);
            Assert.Equal("Not Found: Estate does not exist", result.Message);
        }

        [Fact]
        public async void WhenEsateIdProvided_DeleteEstate()
        {
            //arrange
            var estateId = Guid.NewGuid();

            var command = new DeleteEstateCommand() { EstateId = estateId };

            var estate = new EstateBuilder()
                .Build();

            _estateRepository.Setup(x => x.Get(estateId)).Returns(estate);

            _estateRepository.Setup(x => x.Remove(estate));

            //act
            var result = await sut.Handle(command, It.IsAny<CancellationToken>());

            //assert
            Assert.Equal(200, result.StatusCode);
            _estateRepository.Verify(x => x.Get(estateId), Times.Once);
            _estateRepository.Verify(x => x.Remove(estate), Times.Once);
        }
    }
}
