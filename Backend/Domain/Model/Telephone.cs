namespace Domain.Model
{
    public class Telephone : IEntity
    {
        public Guid Id { get; set; }
        public required string PhoneNumber { get; set; }
        public virtual required Agency Agency { get; set; }
    }
}
