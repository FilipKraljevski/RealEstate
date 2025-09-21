using Domain.Model;

namespace Test.Builder
{
    public class TelephoneBuilder
    {
        private Guid id = Guid.NewGuid();
        private string phoneNumber = "123 456 789";
        private Agency agency = new AgencyBuilder().Build();

        public TelephoneBuilder()
        {
        }

        public Telephone Build()
        {
            return new Telephone
            {
                Id = id,
                PhoneNumber = phoneNumber,
                Agency = agency
            };
        }
    }
}
