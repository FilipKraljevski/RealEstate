using Domain.Enum;
using Domain.Model;
using Domain.UserClaims;
using Moq;
using Repository.Interface;
using Service.Command.SaveEstate;
using Service.DTO.Request;
using Test.Builder;
using Test.Setup;

namespace Test.ServiceTests
{
    public class SaveEstateCommandHandlerTest : MapperSetup
    {
        private readonly Mock<IEstateRepository> _estateRepository;
        private readonly Mock<IAgencyRepository> _agencyRepository;
        private readonly Mock<ICityRepository> _cityRepository;
        private readonly SaveEstateCommandHandler sut;

        public SaveEstateCommandHandlerTest()
        {
            _estateRepository = new Mock<IEstateRepository>();
            _agencyRepository = new Mock<IAgencyRepository>();
            _cityRepository = new Mock<ICityRepository>();
            sut = new SaveEstateCommandHandler(_estateRepository.Object, _agencyRepository.Object, _cityRepository.Object, _imageServiceMock.Object, _mapper);
        }

        [Fact]
        public async void WhenAgencyeNotFound_ReturnNotFound()
        {
            //arrange
            var picture = new ImagesRequest
            {
                Name = "Hall",
                Content = new byte[1]
            };
            var additionalEstateInfo = new AdditionalEstateInfoRequest
            {
                Name = "Terrace"
            };

            var command = new SaveEstateCommand
            {
                SaveEstateRequest = new SaveEstateRequest()
                {
                    Title = "Luxury",
                    EstateType = EstateType.Apartment,
                    PurchaseType = PurchaseType.Purchase,
                    Country = Country.Macedonia,
                    Municipality = "Aerodrom",
                    Area = 45,
                    Price = 45000,
                    Description = "Best apartment in the world",
                    YearOfConstruction = 2016,
                    Rooms = 2,
                    Floor = "2",
                    City = new CityRequest
                    {
                        Name = "Skopje",
                        Country = Country.Macedonia
                    },
                    Pictures = new List<ImagesRequest>
                    {
                        picture
                    },
                    AdditionalEstateInfo = new List<AdditionalEstateInfoRequest>
                    {
                        additionalEstateInfo
                    }
                },
                UserClaims = new UserClaims()
            };

            //act
            var result = await sut.Handle(command, It.IsAny<CancellationToken>());

            //assert
            Assert.Equal(404, result.StatusCode);
            Assert.Equal("Not Found: Agency does not exist", result.Message);
        }

        [Fact]
        public async void WhenEstateIdEmpty_AddEstate()
        {
            //arrange
            var agencyId = Guid.NewGuid();
            var picture = new ImagesRequest
            {
                Name = "Hall",
                Content = new byte[1]
            };
            var additionalEstateInfo = new AdditionalEstateInfoRequest
            {
                Name = "Terrace"
            };

            var command = new SaveEstateCommand
            {
                SaveEstateRequest = new SaveEstateRequest()
                {
                    Title = "Luxury",
                    EstateType = EstateType.Apartment,
                    PurchaseType = PurchaseType.Purchase,
                    Country = Country.Macedonia,
                    Municipality = "Aerodrom",
                    Area = 45,
                    Price = 45000,
                    Description = "Best apartment in the world",
                    YearOfConstruction = 2016,
                    Rooms = 2,
                    Floor = "2",
                    City = new CityRequest
                    {
                        Name = "Skopje",
                        Country = Country.Macedonia
                    },
                    Pictures = new List<ImagesRequest>
                    {
                        picture
                    },
                    AdditionalEstateInfo = new List<AdditionalEstateInfoRequest>
                    {
                        additionalEstateInfo
                    }
                },
                UserClaims = new UserClaims
                {
                    Id = agencyId,
                    Roles = (int)RoleType.Agency
                }
            };

            var agency = new AgencyBuilder()
                .Build();

            _agencyRepository.Setup(x => x.Get(agencyId)).Returns(agency);

            _imageServiceMock.Setup(x => x.Add(It.IsAny<Guid>(), It.IsAny<byte[]>()));

            _estateRepository.Setup(x => x.Add(It.IsAny<Estate>()));

            //act
            var result = await sut.Handle(command, It.IsAny<CancellationToken>());

            var estate = _mapper.Map<Estate>(command.SaveEstateRequest);

            //assert
            Assert.Equal(200, result.StatusCode);
            Assert.True(result.Data);
            Assert.Equal(estate.Title, command.SaveEstateRequest.Title);
            Assert.Equal(estate.EstateType, command.SaveEstateRequest.EstateType);
            Assert.Equal(estate.PurchaseType, command.SaveEstateRequest.PurchaseType);
            Assert.Equal(estate.Country, command.SaveEstateRequest.Country);
            Assert.Equal(estate.Municipality, command.SaveEstateRequest.Municipality);
            Assert.Equal(estate.Area, command.SaveEstateRequest.Area);
            Assert.Equal(estate.Price, command.SaveEstateRequest.Price);
            Assert.Equal(estate.Description, command.SaveEstateRequest.Description);
            Assert.Equal(estate.YearOfConstruction, command.SaveEstateRequest.YearOfConstruction);
            Assert.Equal(estate.Rooms, command.SaveEstateRequest.Rooms);
            Assert.Equal(estate.Floor, command.SaveEstateRequest.Floor);
            Assert.Equal(estate.City.Name, command.SaveEstateRequest.City.Name);
            Assert.Equal(estate.City.Country, command.SaveEstateRequest.City.Country);
            Assert.Equal(estate.AdditionalEstateInfo?.First().Name, command.SaveEstateRequest.AdditionalEstateInfo.First().Name);
            _agencyRepository.Verify(x => x.Get(agencyId), Times.Once);
            _imageServiceMock.Verify(x => x.Add(It.IsAny<Guid>(), It.IsAny<byte[]>()), Times.Once);
            _estateRepository.Verify(x => x.Add(It.IsAny<Estate>()), Times.Once);
        }

        [Fact]
        public async void WhenEstateNotFound_ReturnNotFound()
        {
            //arrange
            var estateId = Guid.NewGuid();
            var agencyId = Guid.NewGuid();
            var picture = new ImagesRequest
            {
                Name = "Hall",
                Content = new byte[1]
            };
            var additionalEstateInfo = new AdditionalEstateInfoRequest
            {
                Name = "Terrace"
            };

            var command = new SaveEstateCommand
            {
                SaveEstateRequest = new SaveEstateRequest()
                {
                    Id = estateId,
                    Title = "Luxury",
                    EstateType = EstateType.Apartment,
                    PurchaseType = PurchaseType.Purchase,
                    Country = Country.Macedonia,
                    Municipality = "Aerodrom",
                    Area = 45,
                    Price = 45000,
                    Description = "Best apartment in the world",
                    YearOfConstruction = 2016,
                    Rooms = 2,
                    Floor = "2",
                    City = new CityRequest
                    {
                        Name = "Skopje",
                        Country = Country.Macedonia
                    },
                    Pictures = new List<ImagesRequest>
                    {
                        picture
                    },
                    AdditionalEstateInfo = new List<AdditionalEstateInfoRequest>
                    {
                        additionalEstateInfo
                    }
                },
                UserClaims = new UserClaims
                {
                    Id = agencyId,
                    Roles = (int)RoleType.Agency
                }
            };

            //act
            var result = await sut.Handle(command, It.IsAny<CancellationToken>());

            //assert
            Assert.Equal(404, result.StatusCode);
            Assert.Equal("Not Found: Estate does not exist", result.Message);
        }

        [Fact]
        public async void WhenEstateIdProvided_UpdateEstate()
        {
            //arrange
            var estateId = Guid.NewGuid();
            var agencyId = Guid.NewGuid();
            var pictureExistId = Guid.NewGuid();
            var additionalInfoExistId = Guid.NewGuid();
            var pictureAdd = new ImagesRequest
            {
                Name = "Hall",
                Content = new byte[1]
            };
            var pictureExistRequest = new ImagesRequest
            {
                Id = pictureExistId,
                Name = "Hall",
                Content = new byte[1]
            };
            var additionalEstateInfoAdd = new AdditionalEstateInfoRequest
            {
                Name = "Terrace"
            };
            var additionalEstateInfoExistRequest = new AdditionalEstateInfoRequest
            {
                Id = additionalInfoExistId,
                Name = "Terrace"
            };

            var command = new SaveEstateCommand
            {
                SaveEstateRequest = new SaveEstateRequest()
                {
                    Id = estateId,
                    Title = "Luxury",
                    EstateType = EstateType.Apartment,
                    PurchaseType = PurchaseType.Purchase,
                    Country = Country.Macedonia,
                    Municipality = "Aerodrom",
                    Area = 45,
                    Price = 45000,
                    Description = "Best apartment in the world",
                    YearOfConstruction = 2016,
                    Rooms = 2,
                    Floor = "2",
                    City = new CityRequest
                    {
                        Name = "Skopje",
                        Country = Country.Macedonia
                    },
                    Pictures = new List<ImagesRequest>
                    {
                        pictureAdd,
                        pictureExistRequest
                    },
                    AdditionalEstateInfo = new List<AdditionalEstateInfoRequest>
                    {
                        additionalEstateInfoAdd
                    }
                },
                UserClaims = new UserClaims
                {
                    Id = agencyId,
                    Roles = (int)RoleType.Agency
                }
            };

            var pictureExist = new ImageBuilder()
                .WithId(pictureExistId)
                .Build();
            var pictureRemove = new ImageBuilder()
                .Build();

            var additionalInfoExist = new AdditionalEstateInfoBuilder()
                .WithId(additionalInfoExistId)
                .Build();
            var additionalInfoRemove = new AdditionalEstateInfoBuilder()
                .Build();

            var estate = new EstateBuilder()
                .Withimages(new List<Images> { pictureExist, pictureRemove })
                .WithAdditionalEstateInfo(new List<AdditionalEstateInfo> {additionalInfoExist, additionalInfoRemove})
                .Build();

            _estateRepository.Setup(x => x.Get(estateId)).Returns(estate);

            _imageServiceMock.Setup(x => x.Remove(It.IsAny<Guid>()));

            _imageServiceMock.Setup(x => x.Add(It.IsAny<Guid>(), It.IsAny<byte[]>()));

            _estateRepository.Setup(x => x.Update(It.IsAny<Estate>()));

            //act
            var result = await sut.Handle(command, It.IsAny<CancellationToken>());

            _mapper.Map(command.SaveEstateRequest, estate);

            //assert
            Assert.Equal(200, result.StatusCode);
            Assert.True(result.Data);
            Assert.Equal(estate.Title, command.SaveEstateRequest.Title);
            Assert.Equal(estate.EstateType, command.SaveEstateRequest.EstateType);
            Assert.Equal(estate.PurchaseType, command.SaveEstateRequest.PurchaseType);
            Assert.Equal(estate.Country, command.SaveEstateRequest.Country);
            Assert.Equal(estate.Municipality, command.SaveEstateRequest.Municipality);
            Assert.Equal(estate.Area, command.SaveEstateRequest.Area);
            Assert.Equal(estate.Price, command.SaveEstateRequest.Price);
            Assert.Equal(estate.Description, command.SaveEstateRequest.Description);
            Assert.Equal(estate.YearOfConstruction, command.SaveEstateRequest.YearOfConstruction);
            Assert.Equal(estate.Rooms, command.SaveEstateRequest.Rooms);
            Assert.Equal(estate.Floor, command.SaveEstateRequest.Floor);
            Assert.Equal(estate.City.Name, command.SaveEstateRequest.City.Name);
            Assert.Equal(estate.City.Country, command.SaveEstateRequest.City.Country);
            Assert.Equal(estate.AdditionalEstateInfo?.Last().Id, command.SaveEstateRequest.AdditionalEstateInfo.Last().Id);
            Assert.DoesNotContain(additionalInfoRemove.Id, estate.AdditionalEstateInfo?.Select(x => x.Id));
            _estateRepository.Verify(x => x.Get(estateId), Times.Once);
            _imageServiceMock.Verify(x => x.Remove(It.IsAny<Guid>()), Times.Once);
            _imageServiceMock.Verify(x => x.Add(It.IsAny<Guid>(), It.IsAny<byte[]>()), Times.Once);
            _estateRepository.Verify(x => x.Update(It.IsAny<Estate>()), Times.Once);
        }
    }
}
