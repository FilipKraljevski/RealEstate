using MediatR;
using Service.DTO.Response;

namespace Service.Query.GetAgencies
{
    public class GetAgenciesQuery : IRequest<Result<List<GetAgencyResponse>>>
    {
    }
}
