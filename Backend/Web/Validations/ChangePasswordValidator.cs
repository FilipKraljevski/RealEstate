using FluentValidation;
using Service.Command.ChangePassword;

namespace Web.Validations
{
    public class ChangePasswordValidator : AbstractValidator<ChangePasswordCommand>
    {
        public ChangePasswordValidator()
        {
            RuleFor(x => x.ChangePasswordRequest.NewPassword)
                .NotEmpty()
                .WithMessage("New password is requried");

            RuleFor(x => x.ChangePasswordRequest.ConfirmPassword)
                .NotEmpty()
                .WithMessage("Confirm password is requried")
                .Equal(x => x.ChangePasswordRequest.NewPassword)
                .WithMessage("Confirm password must be equal with new password");
        }
    }
}
