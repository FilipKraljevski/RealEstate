using Domain.Model;
using Microsoft.EntityFrameworkCore;

namespace Repository
{
    public class RealEstateDbContext : DbContext
    {
        public RealEstateDbContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<City> Cities => Set<City>();
    }
}
