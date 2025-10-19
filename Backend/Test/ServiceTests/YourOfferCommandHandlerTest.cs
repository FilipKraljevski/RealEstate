using Domain.Enum;
using Domain.Model;
using Moq;
using Repository.Interface;
using Service.Command.YourOffer;
using Service.DTO.Request;
using Service.Email;
using Test.Builder;

namespace Test.ServiceTests
{
    public class YourOfferCommandHandlerTest
    {
        private readonly Mock<IMailLogRepository> mailLogRepository;
        private readonly Mock<IAgencyRepository> agencyRepository;
        private readonly Mock<IEmailService> emailService;
        private readonly YourOfferCommandHandler sut;

        public YourOfferCommandHandlerTest()
        {
            mailLogRepository = new Mock<IMailLogRepository>();
            agencyRepository = new Mock<IAgencyRepository>();
            emailService = new Mock<IEmailService>();
            sut = new YourOfferCommandHandler(mailLogRepository.Object, agencyRepository.Object, emailService.Object);
        }

        [Fact]
        public async void TestLookingForProperty()
        {
            //arrange
            var command = new YourOfferCommand()
            {
                YourOfferRequest = new YourOfferRequest()
                {
                    City = "",
                    Code = "",
                    Email = "",
                    Message = "",
                    Municipality = "",
                    Name = "",
                    Country = Country.Macedonia,
                    Images = new List<YourOfferImagesRequest>() 
                    { 
                        new YourOfferImagesRequest() 
                        { 
                            Name = "Name", 
                            Content = new byte[1] 
                        } 
                    }
                }
            };

            var agency = new AgencyBuilder()
                .Build();

            agencyRepository.Setup(x => x.GetByCountry(Country.Macedonia)).Returns(new List<Agency>() { agency });

            emailService.Setup(x => x.SendEmailToAgencies(new List<Agency>() { agency }, It.IsAny<string>(), It.IsAny<string>(), command.YourOfferRequest.Images));

            emailService.Setup(x => x.SendReceivedEmail(command.YourOfferRequest.Name, command.YourOfferRequest.Email));

            mailLogRepository.Setup(x => x.Add(It.IsAny<MailLog>()));

            //act
            var result = await sut.Handle(command, It.IsAny<CancellationToken>());

            //assert
            Assert.Equal(200, result.StatusCode);
            Assert.True(result.Data);
            emailService.Verify(x => x.SendEmailToAgencies(new List<Agency>() { agency }, It.IsAny<string>(), It.IsAny<string>(), command.YourOfferRequest.Images), Times.Once);
            emailService.Verify(x => x.SendReceivedEmail(command.YourOfferRequest.Name, command.YourOfferRequest.Email), Times.Once);
            mailLogRepository.Verify(x => x.Add(It.IsAny<MailLog>()), Times.Once);
        }
    }
}
