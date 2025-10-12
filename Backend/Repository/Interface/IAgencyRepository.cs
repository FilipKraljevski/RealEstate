using Domain.Enum;
using Domain.Model;

namespace Repository.Interface
{
    public interface IAgencyRepository : IRepository<Agency>
    {
        IEnumerable<Agency> GetByCountry(Country country);
    }
}
