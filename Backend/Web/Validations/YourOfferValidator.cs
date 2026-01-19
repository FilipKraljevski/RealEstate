using Domain.Enum;
using FluentValidation;
using Service.Command.YourOffer;

namespace Web.Validations
{
    public class YourOfferValidator : AbstractValidator<YourOfferCommand>
    {
        public YourOfferValidator() 
        {
            RuleFor(x => x.YourOfferRequest.Name)
                .NotEmpty()
                .WithMessage("Name is required");

            RuleFor(x => x.YourOfferRequest.Email)
                .EmailAddress()
                .WithMessage("Email is not valid");

            RuleFor(x => x.YourOfferRequest.Message)
                .NotEmpty()
                .WithMessage("Message is required");

            RuleFor(x => x.YourOfferRequest.PurchaseType)
                .IsInEnum()
                .WithMessage("Purchase type does not exist");

            RuleFor(x => x.YourOfferRequest.EstateType)
                .IsInEnum()
                .WithMessage("Estate type does not exist");

            RuleFor(x => x.YourOfferRequest.Country)
                .IsInEnum()
                .WithMessage("Country type does not exist");

            RuleFor(x => x.YourOfferRequest.City)
                .NotEmpty()
                .WithMessage("City is required");

            RuleFor(x => x.YourOfferRequest.Municipality)
                .NotEmpty()
                .WithMessage("Municipality is required");

            RuleFor(x => x.YourOfferRequest.Area)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Area from cannot be a negative number");

            RuleFor(x => x.YourOfferRequest.Price)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Price cannot be a negative number");

            RuleFor(x => x.YourOfferRequest.YearOfConstruction)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Year of construction to cannot be a negative number");

            RuleFor(x => x.YourOfferRequest.Rooms)
                .NotNull()
                .GreaterThanOrEqualTo(0)
                .When(x => x.YourOfferRequest.EstateType == EstateType.House || x.YourOfferRequest.EstateType == EstateType.Apartment)
                .WithMessage("Rooms cannot be a negative number");

            RuleFor(x => x.YourOfferRequest.FloorFrom)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Floor from cannot be a negative number")
                .LessThanOrEqualTo(x => x.YourOfferRequest.FloorTo)
                .WithMessage("Floor from cannot be greater than Floor to");

            RuleFor(x => x.YourOfferRequest.FloorTo)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Floor to cannot be a negative number")
                .GreaterThanOrEqualTo(x => x.YourOfferRequest.FloorFrom)
                .WithMessage("Floor to cannot be less than Floor from");

            RuleForEach(x => x.YourOfferRequest.Images)
                .ChildRules(image =>
                {
                    image.RuleFor(x => x.Name)
                    .NotEmpty()
                    .WithMessage("Image name is required");
                });
        }
    }
}
