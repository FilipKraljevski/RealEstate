using Domain.Model;

namespace Test.Builder
{
    public class AdditionalEstateInfoBuilder
    {
        private Guid id = Guid.NewGuid();
        private string Name = "terrace";
        private Estate Estate = new EstateBuilder().Build();

        public AdditionalEstateInfoBuilder()
        {
        }

        public AdditionalEstateInfoBuilder WithId(Guid value)
        {
            id = value;
            return this;
        }

        public AdditionalEstateInfo Build()
        {
            return new AdditionalEstateInfo
            {
                Id = id,
                Name = Name,
                Estate = Estate
            };
        }
    }
}
