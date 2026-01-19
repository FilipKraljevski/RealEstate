using AutoMapper;
using Domain.Enum;
using Domain.Model;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Repository.Interface;
using Service.Image;

namespace Service.Command.SaveProfile
{
    public class SaveAgencyCommandHandler : IRequestHandler<SaveAgencyCommand, Result<bool>>
    {
        private readonly IAgencyRepository agencyRepository;
        private readonly IImageService imageService;
        private readonly IPasswordHasher<Agency> passwordHasher;
        private readonly IMapper mapper;

        public SaveAgencyCommandHandler(IAgencyRepository agencyRepository, IImageService imageService, IPasswordHasher<Agency> passwordHasher, IMapper mapper)
        {
            this.agencyRepository = agencyRepository;
            this.imageService = imageService;
            this.passwordHasher = passwordHasher;
            this.mapper = mapper;
        }

        public async Task<Result<bool>> Handle(SaveAgencyCommand request, CancellationToken cancellationToken)
        {
            if (request.SaveAgencyRequest.Id == Guid.Empty)
            {
                var agency = mapper.Map<Agency>(request.SaveAgencyRequest);
                agency.Username = agency.Name.Replace(" ", "") + "_" + DateTime.Now.Date.ToString();
                agency.Password = passwordHasher.HashPassword(agency, $"{agency.Name}_{DateTime.UtcNow.Date}");
                agency.Roles = (int)RoleType.Agency;

                if(request.SaveAgencyRequest.ProfilePicture?.Content != null)
                {
                    AddImage(agency, Convert.FromBase64String(request.SaveAgencyRequest.ProfilePicture.Content));
                }

                agencyRepository.Add(agency);
            }
            else
            {
                var existingAgency = agencyRepository.Get(request.SaveAgencyRequest.Id);

                if (existingAgency == null)
                {
                    return new NotFoundResult<bool>("Not Found: Agency does not exist");
                }

                if (request.SaveAgencyRequest.ProfilePicture?.Id == Guid.Empty && existingAgency.ProfilePictureId != Guid.Empty)
                {
                    imageService.Remove(existingAgency.ProfilePictureId);
                }

                mapper.Map(request.SaveAgencyRequest, existingAgency);

                if (request.SaveAgencyRequest.ProfilePicture?.Id == Guid.Empty && request.SaveAgencyRequest.ProfilePicture.Content != "")
                {
                    AddImage(existingAgency, Convert.FromBase64String(request.SaveAgencyRequest.ProfilePicture.Content));
                }

                agencyRepository.Update(existingAgency);
            }

            return new OkResult<bool>(true);
        }

        private void AddImage(Agency agency, byte[] content)
        {
            agency.ProfilePictureId = Guid.NewGuid();
            imageService.Add(agency.ProfilePictureId, content);
        }
    }
}
