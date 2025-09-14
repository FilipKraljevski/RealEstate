using Domain.Enum;
using Domain.Model;

namespace Repository.Interface
{
    public interface ICityRepository : IRepository<City>
    {
        IEnumerable<City> GetByCountry(Country country);
    }
}
