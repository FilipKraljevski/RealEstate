using Domain.Enum;
using Domain.Model;
using Domain.UserClaims;
using Microsoft.AspNetCore.Identity;
using Moq;
using Repository.Interface;
using Service.Command.ChangePassword;
using Service.DTO.Request;
using Test.Builder;

namespace Test.ServiceTests
{
    public class ChangePasswordCommandHandlerTest
    {
        private readonly Mock<IAgencyRepository> _agencyRepository;
        private readonly IPasswordHasher<Agency> _passwordHasher;
        private readonly ChangePasswordCommandHandler sut;

        public ChangePasswordCommandHandlerTest()
        {
            _agencyRepository = new Mock<IAgencyRepository>();
            _passwordHasher = new PasswordHasher<Agency>();
            sut = new ChangePasswordCommandHandler(_agencyRepository.Object, _passwordHasher);
        }

        [Fact]
        public async void WhenAgencyNotFound_ReturnNotFound()
        {
            //arrange
            var command = new ChangePasswordCommand() 
            { 
                ChangePasswordRequest = new ChangePasswordRequest() 
                { 
                    ConfirmPassword = "",
                    NewPassword = ""
                }, 
                UserClaims = new UserClaims()};

            //act
            var result = await sut.Handle(command, It.IsAny<CancellationToken>());

            //assert
            Assert.Equal(404, result.StatusCode);
            Assert.Equal("Not Found: Agency does not exist", result.Message);
        }

        [Fact]
        public async void WhenAgencyOldPasswordNotCorrect_ReturnError()
        {
            //arrange
            var agencyId = Guid.NewGuid();

            var command = new ChangePasswordCommand()
            {
                ChangePasswordRequest = new ChangePasswordRequest()
                {
                    ConfirmPassword = "",
                    NewPassword = ""
                },
                UserClaims = new UserClaims() 
                { 
                    Id = agencyId,
                    Roles = (int)RoleType.Agency,
                }
            };

            var agency = new AgencyBuilder()
                .Build();

            _agencyRepository.Setup(x => x.Get(agencyId)).Returns(agency);

            //act
            var result = await sut.Handle(command, It.IsAny<CancellationToken>());

            //assert
            Assert.Equal(500, result.StatusCode);
            Assert.Equal("Error: Old password not correct", result.Message);
        }

        [Fact]
        public async void TestUpdatePassword()
        {
            //arrange
            var agencyId = Guid.NewGuid();

            var command = new ChangePasswordCommand()
            {
                ChangePasswordRequest = new ChangePasswordRequest()
                {
                    OldPassword = "password",
                    ConfirmPassword = "",
                    NewPassword = "new password"
                },
                UserClaims = new UserClaims()
                {
                    Id = agencyId,
                    Roles = (int)RoleType.Agency,
                }
            };

            var agency = new AgencyBuilder()
                .Build();

            _agencyRepository.Setup(x => x.Get(agencyId)).Returns(agency);

            _agencyRepository.Setup(x => x.Update(It.IsAny<Agency>()));

            //act
            var result = await sut.Handle(command, It.IsAny<CancellationToken>());

            //assert
            Assert.Equal(200, result.StatusCode);
            Assert.True(result.Data);
            _agencyRepository.Verify(x => x.Get(agencyId), Times.Once);
            _agencyRepository.Verify(x => x.Update(It.IsAny<Agency>()), Times.Once);
        }
    }
}
