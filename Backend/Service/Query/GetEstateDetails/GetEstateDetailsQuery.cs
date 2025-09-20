using MediatR;
using Service.DTO.Response;

namespace Service.Query.GetEstateDetails
{
    public class GetEstateDetailsQuery : IRequest<Result<GetEstateDetailsResponse>>
    {
        public Guid EstateId { get; set; }
    }
}
