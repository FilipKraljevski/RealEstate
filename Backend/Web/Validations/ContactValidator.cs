using FluentValidation;
using Service.DTO.Request;

namespace Web.Validations
{
    public class ContactValidator : AbstractValidator<ContactRequest>
    {
        public ContactValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("Name is required");

            RuleFor(x => x.Email)
                .EmailAddress()
                .WithMessage("Email is not valid");

            RuleFor(x => x.Subject)
                .NotEmpty()
                .WithMessage("Subject is required");

            RuleFor(x => x.Body)
                .NotEmpty()
                .WithMessage("Body is required");
        }
    }
}
