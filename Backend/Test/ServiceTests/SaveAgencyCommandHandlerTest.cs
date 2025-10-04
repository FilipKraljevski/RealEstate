using AutoMapper;
using Domain.Enum;
using Domain.Model;
using Microsoft.AspNetCore.Identity;
using Moq;
using Repository.Interface;
using Service.Command.SaveProfile;
using Service.DTO.Request;
using Test.Builder;
using Test.Setup;

namespace Test.ServiceTests
{
    public class SaveAgencyCommandHandlerTest : MapperSetup
    {
        private readonly Mock<IAgencyRepository> _agencyRepository;
        private readonly IPasswordHasher<Agency> _passwordHasher;
        private readonly SaveAgencyCommandHandler sut;

        public SaveAgencyCommandHandlerTest()
        {
            _agencyRepository = new Mock<IAgencyRepository>();
            _passwordHasher = new PasswordHasher<Agency>();
            sut = new SaveAgencyCommandHandler(_agencyRepository.Object, _imageServiceMock.Object, _passwordHasher, _mapper);
        }

        [Fact]
        public async void WhenIdEmpty_AddAgency()
        {
            //arrange
            var telephone = new TelephoneRequest() 
            { 
                PhoneNumber = "123456789"
            }; 

            var command = new SaveAgencyCommand()
            {
                SaveAgencyRequest = new SaveAgencyRequest()
                {
                    Name = "Gramada Agency",
                    Description = "Best agency in the world",
                    Country = Country.Macedonia,
                    Email = "gramada@mail.com",
                    ProfilePicture = new ProfilePictureRequest()
                    {
                        Content = new byte[1]
                    },
                    Telephones = new List<TelephoneRequest>() { telephone }
                }
            };

            _imageServiceMock.Setup(x => x.Add(It.IsAny<Guid>(), It.IsAny<byte[]>()));

            _agencyRepository.Setup(x => x.Add(It.IsAny<Agency>()));

            //act
            var result = await sut.Handle(command, It.IsAny<CancellationToken>());

            var agency = _mapper.Map<Agency>(command.SaveAgencyRequest);

            //assert
            Assert.Equal(200, result.StatusCode);
            Assert.True(result.Data);
            Assert.Equal(command.SaveAgencyRequest.Name, agency.Name);
            Assert.Equal(command.SaveAgencyRequest.Description, agency.Description);
            Assert.Equal(command.SaveAgencyRequest.Country, agency.Country);
            Assert.Equal(command.SaveAgencyRequest.Email, agency.Email);
            Assert.Equal(command.SaveAgencyRequest.Telephones.First().Id, agency.Telephones?.First().Id);
            _imageServiceMock.Verify(x => x.Add(It.IsAny<Guid>(), It.IsAny<byte[]>()), Times.Once);
            _agencyRepository.Verify(x => x.Add(It.IsAny<Agency>()), Times.Once);
        }

        [Fact]
        public async void WhenAgencyNotFound_ReturnNotFound()
        {
            //arrange
            var agencyId = Guid.NewGuid();
            var telephone = new TelephoneRequest()
            {
                PhoneNumber = "123456789"
            };

            var command = new SaveAgencyCommand()
            {
                SaveAgencyRequest = new SaveAgencyRequest()
                {
                    Id = agencyId,
                    Name = "Gramada Agency",
                    Description = "Best agency in the world",
                    Country = Country.Macedonia,
                    Email = "gramada@mail.com",
                    ProfilePicture = new ProfilePictureRequest()
                    {
                        Content = new byte[1]
                    },
                    Telephones = new List<TelephoneRequest>() { telephone }
                }
            };

            //act
            var result = await sut.Handle(command, It.IsAny<CancellationToken>());

            //assert
            Assert.Equal(404, result.StatusCode);
            Assert.Equal("Not Found: Agency does not exist", result.Message);
        }

        [Fact]
        public async void WhenAgencyIdProvided_UpdateAgency()
        {
            //arrange
            var agencyId = Guid.NewGuid();
            var telephoneAdd = new TelephoneRequest()
            {
                PhoneNumber = "123456789"
            };
            var telephoneExist = new TelephoneRequest()
            {
                Id = Guid.NewGuid(),
                PhoneNumber = "123456789"
            };

            var command = new SaveAgencyCommand()
            {
                SaveAgencyRequest = new SaveAgencyRequest()
                {
                    Id = agencyId,
                    Name = "Gramada Agency",
                    Description = "Best agency in the world",
                    Country = Country.Macedonia,
                    Email = "gramada@mail.com",
                    ProfilePicture = new ProfilePictureRequest()
                    {
                        Content = new byte[1]
                    },
                    Telephones = new List<TelephoneRequest>() { telephoneAdd, telephoneExist }
                }
            };

            var telephoneExist1 = new TelephoneBuilder()
                .WithId(telephoneExist.Id)
                .Build();

            var telephoneRemove = new TelephoneBuilder()
                .Build();

            var agency = new AgencyBuilder()
                .WithTelephones(new List<Telephone>() { telephoneExist1, telephoneRemove })
                .Build();

            var profilePictureId = agency.ProfilePictureId;

            _agencyRepository.Setup(x => x.Get(agencyId)).Returns(agency);

            _imageServiceMock.Setup(x => x.Remove(agency.ProfilePictureId));

            _imageServiceMock.Setup(x => x.Add(It.IsAny<Guid>(), It.IsAny<byte[]>()));

            _agencyRepository.Setup(x => x.Update(It.IsAny<Agency>()));

            //act
            var result = await sut.Handle(command, It.IsAny<CancellationToken>());

            _mapper.Map(command.SaveAgencyRequest, agency);

            //assert
            Assert.Equal(200, result.StatusCode);
            Assert.True(result.Data);
            Assert.Equal(command.SaveAgencyRequest.Name, agency.Name);
            Assert.Equal(command.SaveAgencyRequest.Description, agency.Description);
            Assert.Equal(command.SaveAgencyRequest.Country, agency.Country);
            Assert.Equal(command.SaveAgencyRequest.Email, agency.Email);
            Assert.Equal(command.SaveAgencyRequest.Telephones.Last().Id, agency.Telephones?.Last().Id);
            Assert.DoesNotContain(telephoneRemove.Id, agency.Telephones?.Select(x => x.Id));
            _agencyRepository.Verify(x => x.Get(agencyId), Times.Once);
            _imageServiceMock.Verify(x => x.Remove(profilePictureId), Times.Once);
            _imageServiceMock.Verify(x => x.Add(It.IsAny<Guid>(), It.IsAny<byte[]>()), Times.Once);
            _agencyRepository.Verify(x => x.Update(It.IsAny<Agency>()), Times.Once);
        }
    }
}
