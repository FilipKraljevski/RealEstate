using Domain.Model;
using Repository.Interface;

namespace Repository.Implementation
{
    public class CodeRepository : Repository<CodeAuthorization>, ICodeRepository
    {
        public CodeRepository(RealEstateDbContext realEstateDbContext) : base(realEstateDbContext)
        {
        }

        public CodeAuthorization GetWithIdAndEamil(Guid id, string email)
        {
            return entities.Where(x => x.Id == id && x.Email == email).FirstOrDefault();
        }
    }
}
