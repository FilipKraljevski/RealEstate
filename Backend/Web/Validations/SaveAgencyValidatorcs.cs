using FluentValidation;
using Service.DTO.Request;

namespace Web.Validations
{
    public class SaveAgencyValidatorcs : AbstractValidator<SaveAgencyRequest>
    {
        public SaveAgencyValidatorcs() 
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("Name is required");

            RuleFor(x => x.Description)
                .NotEmpty()
                .WithMessage("Description is required");

            RuleFor(x => x.Country)
                .IsInEnum()
                .WithMessage("Country type does not exist");

            RuleFor(x => x.Email)
                .EmailAddress()
                .WithMessage("Email is not valid");

            RuleFor(x => x.Telephones)
                .NotNull()
                .Must(x => x.Count >= 1)
                .WithMessage("Must contain at least one Telephone");

            RuleForEach(x => x.Telephones)
                .ChildRules(telephone =>
                {
                    telephone.RuleFor(x => x.PhoneNumber)
                    .NotEmpty()
                    .WithMessage("Phone number is requred");
                });
        }
    }
}
