using Domain.Enum;
using System.Net;
using System.Security.Claims;
using System.Web.Http.Controllers;
using System.Web.Http.Filters;

namespace Web.Authorization
{
    public class RoleAuthorize : AuthorizationFilterAttribute
    {
        private RoleType requiredRoles;

        public RoleAuthorize(RoleType requiredRoles)
        {
            this.requiredRoles = requiredRoles;
        }

        public override void OnAuthorization(HttpActionContext actionContext)
        {
            var user = actionContext.RequestContext.Principal as ClaimsPrincipal;

            if (user == null || !user.Identity.IsAuthenticated)
            {
                SetResponse(actionContext, HttpStatusCode.Unauthorized, "Unauthorized");
                return;
            }
            var roleValue = int.Parse(user.Claims.First(x => x.Type == ClaimTypes.Role).Value);
            var roles = (RoleType)roleValue;

            if (!roles.HasFlag(requiredRoles))
            {
                SetResponse(actionContext, HttpStatusCode.Forbidden, "Forbidden");
                return;
            }
        }

        private void SetResponse(HttpActionContext actionContext, HttpStatusCode statusCode, object content)
        {
            actionContext.Response = actionContext.Request.CreateResponse(statusCode, content);
        }
    }
}
