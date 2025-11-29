using Domain.Model;
using Moq;
using Repository.Interface;
using Service.Command.Contact;
using Service.DTO.Request;
using Service.Email;

namespace Test.ServiceTests
{
    public class ContactCommandHandlerTest
    {
        private readonly Mock<IMailLogRepository> mailLogRepository;
        private readonly Mock<IEmailService> emailService;
        private readonly ContactCommandHandler sut;

        public ContactCommandHandlerTest()
        {
            mailLogRepository = new Mock<IMailLogRepository>();
            emailService = new Mock<IEmailService>();
            sut = new ContactCommandHandler(mailLogRepository.Object, emailService.Object);
        }

        [Fact]
        public async void TestContact()
        {
            //arrange
            var command = new ContactCommand()
            {
                ContactRequest = new ContactRequest() 
                { 
                    Name = "Name",
                    Email = "Email@mail.com",
                    Subject = "Subject",
                    Body = "Body",
                }
            };

            emailService.Setup(x => x.SendEmail(command.ContactRequest.Subject, command.ContactRequest.Body));

            emailService.Setup(x => x.SendReceivedEmail(command.ContactRequest.Name, command.ContactRequest.Email));

            mailLogRepository.Setup(x => x.Add(It.IsAny<MailLog>()));

            //act
            var result = await sut.Handle(command, It.IsAny<CancellationToken>());

            //assert
            Assert.Equal(200, result.StatusCode);
            Assert.True(result.Data);
            emailService.Verify(x => x.SendEmail(command.ContactRequest.Subject, command.ContactRequest.Body), Times.Once);
            emailService.Verify(x => x.SendReceivedEmail(command.ContactRequest.Name, command.ContactRequest.Email), Times.Once);
            mailLogRepository.Verify(x => x.Add(It.IsAny<MailLog>()), Times.Once);
        }
    }
}
