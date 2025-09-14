using MediatR;
using Service.DTO.Response;

namespace Service.Query.GetAgenciesNames
{
    public class GetAgenciesNamesQuery : IRequest<Result<List<GetAgencyNameResponse>>>
    {
    }
}
