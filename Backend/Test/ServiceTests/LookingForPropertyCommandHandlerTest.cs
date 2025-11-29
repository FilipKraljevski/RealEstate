using Domain.Enum;
using Domain.Model;
using Moq;
using Repository.Interface;
using Service.Command.LookingForProperty;
using Service.DTO.Request;
using Service.Email;
using Test.Builder;

namespace Test.ServiceTests
{
    public class LookingForPropertyCommandHandlerTest
    {
        private readonly Mock<IMailLogRepository> mailLogRepository;
        private readonly Mock<IAgencyRepository> agencyRepository;
        private readonly Mock<IEmailService> emailService;
        private readonly LookingForPropertyCommandHandler sut;

        public LookingForPropertyCommandHandlerTest()
        {
            mailLogRepository = new Mock<IMailLogRepository>();
            agencyRepository = new Mock<IAgencyRepository>();
            emailService = new Mock<IEmailService>();
            sut = new LookingForPropertyCommandHandler(mailLogRepository.Object, agencyRepository.Object, emailService.Object);
        }

        [Fact]
        public async void TestLookingForProperty()
        {
            //arrange
            var command = new LookingForPropertyCommand() 
            { 
                LookingForPropertyRequest = new LookingForPropertyRequest() 
                { 
                    City = "", Code = "", Email = "", Message = "", Municipality = "", Name = "", Telephone = "1234567",
                    Country = Country.Macedonia
                },
                Code = "Code",
                Email = "Email"
            };

            var agency = new AgencyBuilder()
                .Build();

            agencyRepository.Setup(x => x.GetByCountry(Country.Macedonia)).Returns(new List<Agency>() { agency });

            emailService.Setup(x => x.SendEmailToAgencies(new List<Agency>() { agency }, It.IsAny<string>(), It.IsAny<string>(), null));

            emailService.Setup(x => x.SendReceivedEmail(command.LookingForPropertyRequest.Name, command.LookingForPropertyRequest.Email));

            mailLogRepository.Setup(x => x.Add(It.IsAny<MailLog>()));

            //act
            var result = await sut.Handle(command, It.IsAny<CancellationToken>());

            //assert
            Assert.Equal(200, result.StatusCode);
            Assert.True(result.Data);
            emailService.Verify(x => x.SendEmailToAgencies(new List<Agency>() { agency }, It.IsAny<string>(), It.IsAny<string>(), null), Times.Once);
            emailService.Verify(x => x.SendReceivedEmail(command.LookingForPropertyRequest.Name, command.LookingForPropertyRequest.Email), Times.Once);
            mailLogRepository.Verify(x => x.Add(It.IsAny<MailLog>()), Times.Once);
        }
    }
}
