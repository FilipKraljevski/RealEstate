using MediatR;
using Service.DTO.Response;

namespace Service.Query.GetAgencyDetails
{
    public class GetAgencyDetailsQuery : IRequest<Result<GetAgencyDetailsResponse>>
    {
        public Guid AgencyId { get; set; }
    }
}
