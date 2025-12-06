using Domain;
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

        public CodeAuthorization Add(CodeAuthorization entity) 
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity is null");
            }

            var code = entities.Add(entity).Entity;
            realEstateDbContext.SaveChanges();
            return code;
        }
    }
}
