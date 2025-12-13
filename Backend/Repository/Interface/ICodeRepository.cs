using Domain.Model;

namespace Repository.Interface
{
    public interface ICodeRepository : IRepository<CodeAuthorization>
    {
        CodeAuthorization GetWithIdAndEmail(Guid id, string email);
        CodeAuthorization Add(CodeAuthorization entity);
    }
}
