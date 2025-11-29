using Service;

namespace Web.Middleware
{
    public class ExceptionHandlingMiddleware
    {
        private readonly RequestDelegate next;

        public ExceptionHandlingMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next(context);
            }
            catch (Exception ex)
            {
                var result = new Result<object>(StatusCodes.Status400BadRequest)
                {
                    Message = ex.Message,
                    Data = null
                };

                context.Response.ContentType = "application/json";
                context.Response.StatusCode = result.StatusCode;

                await context.Response.WriteAsJsonAsync(result);
            }
        }
    }
}
