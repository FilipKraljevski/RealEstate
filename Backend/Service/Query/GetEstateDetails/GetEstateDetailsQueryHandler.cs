using AutoMapper;
using MediatR;
using Repository.Interface;
using Service.DTO.Response;

namespace Service.Query.GetEstateDetails
{
    public class GetEstateDetailsQueryHandler : IRequestHandler<GetEstateDetailsQuery, Result<GetEstateDetailsResponse>>
    {
        private readonly IEstateRepository estateRepository;
        private readonly IMapper mapper;

        public GetEstateDetailsQueryHandler(IEstateRepository estateRepository, IMapper mapper)
        {
            this.estateRepository = estateRepository;
            this.mapper = mapper;
        }

        public async Task<Result<GetEstateDetailsResponse>> Handle(GetEstateDetailsQuery request, CancellationToken cancellationToken)
        {
            if (request.EstateId == Guid.Empty)
            {
                return new ErrorResult<GetEstateDetailsResponse>("Error: Estate id not provided or empty");
            }

            var estate = estateRepository.Get(request.EstateId);

            if(estate == null)
            {
                return new NotFoundResult<GetEstateDetailsResponse>("Not Found: Estate does not exist");
            }

            var mappedEstate = mapper.Map<GetEstateDetailsResponse>(estate); 

            return new OkResult<GetEstateDetailsResponse>(mappedEstate);
        }
    }
}
