using AutoMapper;
using Domain.Model;
using MediatR;
using Repository.Helper;
using Repository.Interface;
using Service.DTO.Request;
using Service.DTO.Response;
using Service.FilterMapping;
using System.Data.Entity;

namespace Service.Query.GetEstates
{
    public class GetEstatesQueryHandler : IRequestHandler<GetEstatesQuery, Result<List<GetEstateResponse>>>
    {
        private readonly IEstateRepository estateRepository;
        private readonly IMapper mapper;

        public GetEstatesQueryHandler(IEstateRepository estateRepository, IMapper mapper)
        {
            this.estateRepository = estateRepository;
            this.mapper = mapper;
        }

        public async Task<Result<List<GetEstateResponse>>> Handle(GetEstatesQuery request, CancellationToken cancellationToken)
        {
            var filterMapper = new GetEstateFiltersMapping();

            var filters = FilterBuilder<GetEstateFiltersRequest, GetEstateFiltersMapping, Estate>.Build(request.Filters, filterMapper);

            var estates = estateRepository.GetAsQueryable()
                .Where(filters)
                .Skip((request.Page - 1) * request.Size)
                .Take(request.Size)
                .AsEnumerable();

            var mappedEstates = mapper.Map<List<GetEstateResponse>>(estates);

            return new OkResult<List<GetEstateResponse>>(mappedEstates);
        }
    }
}
