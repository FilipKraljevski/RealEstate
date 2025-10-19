using Domain.Enum;
using FluentValidation;
using Service.DTO.Request;

namespace Web.Validations
{
    public class SaveEstateValidator : AbstractValidator<SaveEstateRequest>
    {
        public SaveEstateValidator() 
        {
            RuleFor(x => x.Title)
                .NotEmpty()
                .WithMessage("Title is required");

            RuleFor(x => x.PurchaseType)
                .IsInEnum()
                .WithMessage("Purchase type does not exist");

            RuleFor(x => x.EstateType)
                .IsInEnum()
                .WithMessage("Estate type does not exist");

            RuleFor(x => x.Country)
                .IsInEnum()
                .WithMessage("Country type does not exist");

            RuleFor(x => x.Municipality)
                .NotEmpty()
                .WithMessage("Municipality is required");

            RuleFor(x => x.Area)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Area from cannot be a negative number");

            RuleFor(x => x.Price)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Price cannot be a negative number");

            RuleFor(x => x.Description)
                .NotEmpty()
                .WithMessage("Description is required");

            RuleFor(x => x.YearOfConstruction)
                .GreaterThanOrEqualTo(0)
                .WithMessage("Year of construction to cannot be a negative number");

            RuleFor(x => x.Rooms)
                .NotNull()
                .GreaterThanOrEqualTo(0)
                .When(x => x.EstateType == EstateType.House || x.EstateType == EstateType.Apartment)
                .WithMessage("Rooms cannot be a negative number");

            RuleFor(x => x.Floor)
                .NotNull()
                .When(x => x.EstateType == EstateType.House || x.EstateType == EstateType.Apartment)
                .WithMessage("Floor is required");

            RuleFor(x => x.City)
                .NotEmpty()
                .WithMessage("City is required");

            RuleFor(x => x.City.Name)
                .NotEmpty()
                .WithMessage("City name is required");

            When(x => x.Pictures != null, () =>
            {
                RuleForEach(x => x.Pictures)
                .ChildRules(pictire =>
                {
                    pictire.RuleFor(x => x.Name)
                    .NotEmpty()
                    .WithMessage("Picture name is required");
                });
            });

            When(x => x.AdditionalEstateInfos != null, () =>
            {
                RuleForEach(x => x.AdditionalEstateInfos)
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
