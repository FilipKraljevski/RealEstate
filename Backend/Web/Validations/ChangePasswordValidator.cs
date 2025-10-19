using FluentValidation;
using Service.DTO.Request;

namespace Web.Validations
{
    public class ChangePasswordValidator : AbstractValidator<ChangePasswordRequest>
    {
        public ChangePasswordValidator()
        {
            RuleFor(x => x.NewPassword)
                .NotEmpty()
                .WithMessage("New password is requried");

            RuleFor(x => x.ConfirmPassword)
                .NotEmpty()
                .WithMessage("Confirm password is requried")
                .Matches(x => x.NewPassword)
                .WithMessage("Confirm password must be equal with new password");
        }
    }
}
