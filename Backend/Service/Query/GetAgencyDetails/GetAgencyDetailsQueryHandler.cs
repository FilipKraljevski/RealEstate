using AutoMapper;
using MediatR;
using Repository.Interface;
using Service.DTO.Response;

namespace Service.Query.GetAgencyDetails
{
    public class GetAgencyDetailsQueryHandler : IRequestHandler<GetAgencyDetailsQuery, Result<GetAgencyDetailsResponse>>
    {
        private readonly IAgencyRepository agencyRepository;
        private readonly IMapper mapper;

        public GetAgencyDetailsQueryHandler(IAgencyRepository agencyRepository, IMapper mapper)
        {
            this.agencyRepository = agencyRepository;
            this.mapper = mapper;
        }

        public async Task<Result<GetAgencyDetailsResponse>> Handle(GetAgencyDetailsQuery request, CancellationToken cancellationToken)
        {
            if (request.AgencyId == Guid.Empty) 
            {
                return new ErrorResult<GetAgencyDetailsResponse>("Error: Agency id not provided or empty");
            }

            var agency = agencyRepository.Get(request.AgencyId);

            if (agency == null)
            {
                return new NotFoundResult<GetAgencyDetailsResponse>("Not Found: Agency does not exist");
            }

            var mappedAgency = mapper.Map<GetAgencyDetailsResponse>(agency);

            return new OkResult<GetAgencyDetailsResponse>(mappedAgency);
        }
    }
}
