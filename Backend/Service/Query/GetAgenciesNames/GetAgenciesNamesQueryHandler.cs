using AutoMapper;
using MediatR;
using Repository.Interface;
using Service.DTO.Response;

namespace Service.Query.GetAgenciesNames
{
    public class GetAgenciesNamesQueryHandler : IRequestHandler<GetAgenciesNamesQuery, Result<List<GetAgencyNameResponse>>>
    {
        private readonly IAgencyRepository agencyRepository;
        private readonly IMapper mapper;

        public GetAgenciesNamesQueryHandler(IAgencyRepository agencyRepository, IMapper mapper)
        {
            this.agencyRepository = agencyRepository;
            this.mapper = mapper;
        }

        public async Task<Result<List<GetAgencyNameResponse>>> Handle(GetAgenciesNamesQuery request, CancellationToken cancellationToken)
        {

            var agencies = agencyRepository.GetAll();

            var mappedAgencies = mapper.Map<List<GetAgencyNameResponse>>(agencies);

            return new OkResult<List<GetAgencyNameResponse>>(mappedAgencies);
        }
    }
}
