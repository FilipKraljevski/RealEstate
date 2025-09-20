using Domain.Enum;

namespace Domain.Model
{
    public class Estate
    {
        public Guid Id { get; set; }
        public required string Title { get; set; }
        public EstateType EstateType { get; set; }
        public PurchaseType PurchaseType { get; set; }
        public Country Country { get; set; }
        public required string Municipality { get; set; }
        public long Area { get; set; }
        public long Price { get; set; }
        public required string Description { get; set; }
        public DateTime PublishedDate { get; set; }
        public int YearOfConstruction { get; set; }
        public int? Rooms { get; set; }
        public string? Floor { get; set; }
        public virtual required City City { get; set; }
        public virtual required Agency Agency { get; set; }
        public virtual ICollection<Images>? Images { get; set; }
        public virtual ICollection<AdditionalEstateInfo>? AdditionalEstateInfo { get; set; }
    }
}
