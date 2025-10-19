using Domain.Enum;

namespace Domain.Model
{
    public class City : IEntity
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public Country Country { get; set; }
    }
}
