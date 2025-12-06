using MediatR;
using Service.DTO;
using System.Security.Claims;

namespace Web.Behaviors
{
    public class IdentityBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
    {
        private readonly IHttpContextAccessor httpContextAccessor;

        public IdentityBehavior(IHttpContextAccessor httpContextAccessor)
        {
            this.httpContextAccessor = httpContextAccessor;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            if (httpContextAccessor.HttpContext != null)
            {
                if (request is IIdentityRequest)
                {
                    var identityRequest = (IIdentityRequest)request;
                    var id = httpContextAccessor.HttpContext.User.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value ?? "";
                    var roles = httpContextAccessor.HttpContext.User.Claims?.FirstOrDefault(x => x.Type == ClaimTypes.Role)?.Value ?? "0";

                    identityRequest.UserClaims.Id = Guid.Parse(id);
                    identityRequest.UserClaims.Roles = int.Parse(roles);
                }
            }
            else
            {
                throw new Exception("Error Missing context");
            }

            return await next();
        }
    }
}
