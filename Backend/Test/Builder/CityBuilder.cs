using Domain.Enum;
using Domain.Model;

namespace Test.Builder
{
    public class CityBuilder
    {
        private Guid id = Guid.NewGuid();
        private string name = "Skopje";
        private Country country = Country.Macedonia;

        public CityBuilder() 
        {
        }

        public CityBuilder WithId(Guid value) 
        {
            id = value;
            return this;
        }

        public City Build()
        {
            return new City
            {
                Id = id,
                Name = name,
                Country = country
            };
        }
    }
}
