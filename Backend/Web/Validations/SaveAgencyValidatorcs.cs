using FluentValidation;
using Service.Command.SaveProfile;

namespace Web.Validations
{
    public class SaveAgencyValidatorcs : AbstractValidator<SaveAgencyCommand>
    {
        public SaveAgencyValidatorcs() 
        {
            RuleFor(x => x.SaveAgencyRequest.Name)
                .NotEmpty()
                .WithMessage("Name is required");

            RuleFor(x => x.SaveAgencyRequest.Description)
                .NotEmpty()
                .WithMessage("Description is required");

            RuleFor(x => x.SaveAgencyRequest.Country)
                .IsInEnum()
                .WithMessage("Country type does not exist");

            RuleFor(x => x.SaveAgencyRequest.Email)
                .EmailAddress()
                .WithMessage("Email is not valid");

            RuleFor(x => x.SaveAgencyRequest.Telephones)
                .NotNull()
                .Must(x => x.Count >= 1)
                .WithMessage("Must contain at least one Telephone");

            RuleForEach(x => x.SaveAgencyRequest.Telephones)
                .ChildRules(telephone =>
                {
                    telephone.RuleFor(x => x.PhoneNumber)
                    .NotEmpty()
                    .WithMessage("Phone number is requred");
                });
        }
    }
}
