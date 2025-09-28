using Domain.Enum;
using Domain.Model;

namespace Test.Builder
{
    public class EstateBuilder
    {
        private Guid id = Guid.NewGuid();
        private string title = "Luxury";
        private EstateType estateType = EstateType.Apartment;
        private PurchaseType purchaseType = PurchaseType.Purchase;
        private Country country = Country.Macedonia;
        private string municipality = "Aerodrom";
        private long area = 45;
        private long price = 45000;
        private string description = "Best apartment in the world";
        private DateTime publishedDate = DateTime.Now;
        private int yearOfConstruction = 2016;
        private int? rooms = 2;
        private string? floor = "2";
        private City city = new CityBuilder().Build();
        private Agency agency = new AgencyBuilder().Build();
        private ICollection<Images>? images = new List<Images>();
        private ICollection<AdditionalEstateInfo>? additionalEstateInfo = new List<AdditionalEstateInfo>();

        public EstateBuilder()
        {
        }

        public EstateBuilder WithPurchaseType(PurchaseType value)
        {
            purchaseType = value;
            return this;
        }
        public EstateBuilder WithEstateType(EstateType value)
        {
            estateType = value;
            return this;
        }
        public EstateBuilder WithCountry(Country value)
        {
            country = value;
            return this;
        }
        public EstateBuilder WithCity(City value)
        {
            city = value;
            return this;
        }
        public EstateBuilder WithAgency(Agency value)
        {
            agency = value;
            return this;
        }
        public EstateBuilder WithArea(long value)
        {
            area = value;
            return this;
        }
        public EstateBuilder WithPrice(long value)
        {
            price = value;
            return this;
        }
        public EstateBuilder WithAdditionalEstateInfo(List<AdditionalEstateInfo> value)
        {
            additionalEstateInfo = value;
            return this;
        }
        public EstateBuilder Withimages(List<Images> value)
        {
            images = value;
            return this;
        }

        public Estate Build()
        {
            return new Estate
            {
                Id = id,
                Title = title,
                EstateType = estateType,
                PurchaseType = purchaseType,
                Country = country,
                Municipality = municipality,
                Area = area,
                Price = price,
                Description = description,
                PublishedDate = publishedDate,
                YearOfConstruction = yearOfConstruction,
                Rooms = rooms,
                Floor = floor,
                City = city,
                Agency = agency,
                Images = images,
                AdditionalEstateInfo = additionalEstateInfo
            };
        }
    }
}
