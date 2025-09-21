using AutoMapper;
using MediatR;
using Repository.Interface;
using Service.DTO.Response;

namespace Service.Query.GetAgencies
{
    public class GetAgenciesQueryHandler : IRequestHandler<GetAgenciesQuery, Result<List<GetAgencyResponse>>>
    {
        private readonly IAgencyRepository agencyRepository;
        private readonly IMapper mapper;

        public GetAgenciesQueryHandler(IAgencyRepository agencyRepository, IMapper mapper)
        {
            this.agencyRepository = agencyRepository;
            this.mapper = mapper;
        }

        public async Task<Result<List<GetAgencyResponse>>> Handle(GetAgenciesQuery request, CancellationToken cancellationToken)
        {
            var agencies = agencyRepository.GetAll();

            var mappedAgencies = mapper.Map<List<GetAgencyResponse>>(agencies);

            return new OkResult<List<GetAgencyResponse>>(mappedAgencies);
        }
    }
}
