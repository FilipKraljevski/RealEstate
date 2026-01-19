using FluentValidation;
using MediatR;

namespace Web.Behaviors
{
    public class ValidationBehavior<TRequest, TResponse> : IPipelineBehavior<TRequest, TResponse> where TRequest : IRequest<TResponse>
    {
        private readonly IValidator<TRequest>? validator;

        public ValidationBehavior(IValidator<TRequest>? validator = null)
        {
            this.validator = validator;
        }

        public async Task<TResponse> Handle(TRequest request, RequestHandlerDelegate<TResponse> next, CancellationToken cancellationToken)
        {
            if (validator != null)
            {
                var validation = validator.Validate(request);

                if (!validation.IsValid)
                {
                    throw new Exception("Error validation");
                }
            }

            return await next();
        }
    }
}
