using Domain.Model;
using Repository.Interface;

namespace Repository.Implementation
{
    public class MailLogRepository : Repository<MailLog>, IMailLogRepository
    {
        public MailLogRepository(RealEstateDbContext realEstateDbContext) : base(realEstateDbContext)
        {
        }
    }
}
