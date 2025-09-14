using AutoMapper;
using MediatR;
using Repository.Interface;
using Service.DTO.Response;

namespace Service.Query.GetAgenciesNames
{
    public class GetAgenciesNamesQueryHanlder : IRequestHandler<GetAgenciesNamesQuery, Result<List<GetAgencyNameResponse>>>
    {
        private readonly IAgencyRepository agencyRepository;
        private readonly IMapper mapper;

        public GetAgenciesNamesQueryHanlder(IAgencyRepository agencyRepository, IMapper mapper)
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
