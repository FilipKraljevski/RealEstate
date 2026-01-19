using Domain.Enum;
using FluentValidation;
using Service.Command.SaveEstate;

namespace Web.Validations
{
    public class SaveEstateValidator : AbstractValidator<SaveEstateCommand>
    {
        public SaveEstateValidator() 
        {
            RuleFor(x => x.SaveEstateRequest.Title)
                .NotEmpty()
                .WithMessage("Title is required");

            RuleFor(x => x.SaveEstateRequest.PurchaseType)
                .IsInEnum()
                .WithMessage("Purchase type does not exist");

            RuleFor(x => x.SaveEstateRequest.EstateType)
                .IsInEnum()
                .WithMessage("Estate type does not exist");

            RuleFor(x => x.SaveEstateRequest.Country)
                .IsInEnum()
                .WithMessage("Country type does not exist");

            RuleFor(x => x.SaveEstateRequest.Municipality)
                .NotEmpty()
                .WithMessage("Municipality is required");

            RuleFor(x => x.SaveEstateRequest.Area)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Area from cannot be a negative number");

            RuleFor(x => x.SaveEstateRequest.Price)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Price cannot be a negative number");

            RuleFor(x => x.SaveEstateRequest.Description)
                .NotEmpty()
                .WithMessage("Description is required");

            RuleFor(x => x.SaveEstateRequest.YearOfConstruction)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Year of construction to cannot be a negative number");

            RuleFor(x => x.SaveEstateRequest.Rooms)
                .NotNull()
                .GreaterThanOrEqualTo(0)
                .When(x => x.SaveEstateRequest.EstateType == EstateType.House || x.SaveEstateRequest.EstateType == EstateType.Apartment)
                .WithMessage("Rooms cannot be a negative number");

            RuleFor(x => x.SaveEstateRequest.Floor)
                .NotNull()
                .When(x => x.SaveEstateRequest.EstateType == EstateType.House || x.SaveEstateRequest.EstateType == EstateType.Apartment)
                .WithMessage("Floor is required");

            RuleFor(x => x.SaveEstateRequest.City)
                .NotEmpty()
                .WithMessage("City is required");

            RuleFor(x => x.SaveEstateRequest.City.Name)
                .NotEmpty()
                .WithMessage("City name is required");

            When(x => x.SaveEstateRequest.Images != null, () =>
            {
                RuleForEach(x => x.SaveEstateRequest.Images)
                .ChildRules(picture =>
                {
                    picture.RuleFor(x => x.Content)
                    .NotEmpty()
                    .WithMessage("Picture content is required");
                });
            });

            When(x => x.SaveEstateRequest.AdditionalEstateInfo != null, () =>
            {
                RuleForEach(x => x.SaveEstateRequest.AdditionalEstateInfo)
                .ChildRules(additionalEstateInfo =>
                {
                    additionalEstateInfo.RuleFor(x => x.Name)
                    .NotEmpty()
                    .WithMessage("Additional estate Info name is required");
                });
            });
        }
    }
}
