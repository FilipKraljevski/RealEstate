using Domain.Model;
using Microsoft.EntityFrameworkCore;
using Repository.Interface;

namespace Repository.Implementation
{
    public class MailLogRepository : IMailLogRepository
    {
        protected readonly RealEstateDbContext realEstateDbContext;
        protected DbSet<MailLog> entities;
        public MailLogRepository(RealEstateDbContext realEstateDbContext)
        {
            this.realEstateDbContext = realEstateDbContext;
            entities = realEstateDbContext.Set<MailLog>();
        }

        public void Add(MailLog entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity is null");
            }

            entities.Add(entity);
            realEstateDbContext.SaveChanges();
        }
    }
}
