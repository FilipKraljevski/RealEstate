using MediatR;

namespace Service.DTO
{
    public interface TwoFactorAuth<TResponse> : IRequest<TResponse>
    {
        public Guid CodeId { get; set; }
        public string Code { get; set; }
        public string Email { get; set; }
    }
}
