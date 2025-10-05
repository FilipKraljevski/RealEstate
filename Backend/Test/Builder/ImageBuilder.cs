using Domain.Model;

namespace Test.Builder
{
    public class ImageBuilder
    {
        private Guid id = Guid.NewGuid();
        private string name = "Picture";
        private Estate estate = new EstateBuilder().Build();

        public ImageBuilder()
        {
        }

        public ImageBuilder WithId(Guid value)
        {
            id = value;
            return this;
        }

        public Images Build()
        {
            return new Images
            {
                Id = id,
                Name = name,
                Estate = estate
            };
        }
    }
}
