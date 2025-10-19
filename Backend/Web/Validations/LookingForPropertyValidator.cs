using Domain.Enum;
using FluentValidation;
using Service.DTO.Request;

namespace Web.Validations
{
    public class LookingForPropertyValidator : AbstractValidator<LookingForPropertyRequest>
    {
        public LookingForPropertyValidator() 
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                .WithMessage("Name is required");

            RuleFor(x => x.Email)
                .EmailAddress()
                .WithMessage("Email is not valid");

            RuleFor(x => x.Message)
                .NotEmpty()
                .WithMessage("Message is required");

            RuleFor(x => x.PurchaseType)
                .IsInEnum()
                .WithMessage("Purchase type does not exist");

            RuleFor(x => x.EstateType)
                .IsInEnum()
                .WithMessage("Estate type does not exist");

            RuleFor(x => x.Country)
                .IsInEnum()
                .WithMessage("Country type does not exist");

            RuleFor(x => x.City)
                .NotEmpty()
                .WithMessage("City is required");

            RuleFor(x => x.Municipality)
                .NotEmpty()
                .WithMessage("Municipality is required");

            RuleFor(x => x.AreaFrom)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Area from cannot be a negative number")
                .LessThan(x => x.AreaTo)
                .WithMessage("Area from cannot be greater or equal than Area to");

            RuleFor(x => x.AreaTo)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Area to cannot be a negative number")
                .GreaterThan(x => x.AreaFrom)
                .WithMessage("Area to cannot be less or equal than Area from");

            RuleFor(x => x.MaxPrice)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Price cannot be a negative number");

            RuleFor(x => x.YearOfConstruction)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Year of construction to cannot be a negative number");

            RuleFor(x => x.Rooms)
                .NotNull()
                .GreaterThanOrEqualTo(0)
                .When(x => x.EstateType == EstateType.House || x.EstateType == EstateType.Apartment)
                .WithMessage("Rooms cannot be a negative number");

            RuleFor(x => x.FloorFrom)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Floor from cannot be a negative number")
                .LessThan(x => x.FloorTo)
                .WithMessage("Floor from cannot be greater or equal than Area to");

            RuleFor(x => x.FloorTo)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Floor to cannot be a negative number")
                .GreaterThan(x => x.FloorFrom)
                .WithMessage("Floor to cannot be less or equal than Area from");
        }
    }
}
