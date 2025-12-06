using Domain.Model;

namespace Repository.Interface
{
    public interface ICodeRepository : IRepository<CodeAuthorization>
    {
        CodeAuthorization GetWithIdAndEamil(Guid id, string email);
        CodeAuthorization Add(CodeAuthorization entity);
    }
}
