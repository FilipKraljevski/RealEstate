using FluentValidation;
using Service.Command.Contact;

namespace Web.Validations
{
    public class ContactValidator : AbstractValidator<ContactCommand>
    {
        public ContactValidator()
        {
            RuleFor(x => x.ContactRequest.Name)
                .NotEmpty()
                .WithMessage("Name is required");

            RuleFor(x => x.ContactRequest.Email)
                .EmailAddress()
                .WithMessage("Email is not valid");

            RuleFor(x => x.ContactRequest.Subject)
                .NotEmpty()
                .WithMessage("Subject is required");

            RuleFor(x => x.ContactRequest.Body)
                .NotEmpty()
                .WithMessage("Body is required");
        }
    }
}
