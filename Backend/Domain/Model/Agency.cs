using Domain.Enum;

namespace Domain.Model
{
    public class Agency
    {
        public Guid Id { get; set; }
        public required string Name { get; set; }
        public required string Description { get; set; }
        public Country Country { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
        public Guid ProfilePictureId {get; set; }
        public virtual ICollection<Estate>? Estates { get; set; }
        public virtual ICollection<Telephone>? Telephones { get; set; }
    }
}
