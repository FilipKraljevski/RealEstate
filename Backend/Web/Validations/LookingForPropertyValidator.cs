using Domain.Enum;
using FluentValidation;
using Service.Command.LookingForProperty;

namespace Web.Validations
{
    public class LookingForPropertyValidator : AbstractValidator<LookingForPropertyCommand>
    {
        public LookingForPropertyValidator() 
        {
            RuleFor(x => x.LookingForPropertyRequest.Name)
                .NotEmpty()
                .WithMessage("Name is required");

            RuleFor(x => x.LookingForPropertyRequest.Email)
                .EmailAddress()
                .WithMessage("Email is not valid");

            RuleFor(x => x.LookingForPropertyRequest.Message)
                .NotEmpty()
                .WithMessage("Message is required");

            RuleFor(x => x.LookingForPropertyRequest.PurchaseType)
                .IsInEnum()
                .WithMessage("Purchase type does not exist");

            RuleFor(x => x.LookingForPropertyRequest.EstateType)
                .IsInEnum()
                .WithMessage("Estate type does not exist");

            RuleFor(x => x.LookingForPropertyRequest.Country)
                .IsInEnum()
                .WithMessage("Country type does not exist");

            RuleFor(x => x.LookingForPropertyRequest.City)
                .NotEmpty()
                .WithMessage("City is required");

            RuleFor(x => x.LookingForPropertyRequest.Municipality)
                .NotEmpty()
                .WithMessage("Municipality is required");

            RuleFor(x => x.LookingForPropertyRequest.AreaFrom)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Area from cannot be a negative number")
                .LessThanOrEqualTo(x => x.LookingForPropertyRequest.AreaTo)
                .WithMessage("Area from cannot be greater than Area to");

            RuleFor(x => x.LookingForPropertyRequest.AreaTo)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Area to cannot be a negative number")
                .GreaterThanOrEqualTo(x => x.LookingForPropertyRequest.AreaFrom)
                .WithMessage("Area to cannot be less than Area from");

            RuleFor(x => x.LookingForPropertyRequest.MaxPrice)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Price cannot be a negative number");

            RuleFor(x => x.LookingForPropertyRequest.YearOfConstruction)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Year of construction to cannot be a negative number");

            RuleFor(x => x.LookingForPropertyRequest.Rooms)
                .NotNull()
                .GreaterThanOrEqualTo(0)
                .When(x => x.LookingForPropertyRequest.EstateType == EstateType.House || x.LookingForPropertyRequest.EstateType == EstateType.Apartment)
                .WithMessage("Rooms cannot be a negative number");

            RuleFor(x => x.LookingForPropertyRequest.FloorFrom)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Floor from cannot be a negative number")
                .LessThanOrEqualTo(x => x.LookingForPropertyRequest.FloorTo)
                .WithMessage("Floor from cannot be greater than Floor to");

            RuleFor(x => x.LookingForPropertyRequest.FloorTo)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Floor to cannot be a negative number")
                .GreaterThanOrEqualTo(x => x.LookingForPropertyRequest.FloorFrom)
                .WithMessage("Floor to cannot be less than Floor from");
        }
    }
}
