using MediatR;
using Service.DTO.Request;
using Service.DTO.Response;

namespace Service.Query.GetEstates
{
    public class GetEstatesQuery : IRequest<Result<List<GetEstateResponse>>>
    {
        public required GetEstateFiltersRequest Filters { get; set; }
        public int Page {  get; set; }
        public int Size { get; set; }
    }
}
