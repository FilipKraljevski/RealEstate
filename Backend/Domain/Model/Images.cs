namespace Domain.Model
{
    public class Images : IEntity
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public virtual required Estate Estate { get; set; }
    }
}
