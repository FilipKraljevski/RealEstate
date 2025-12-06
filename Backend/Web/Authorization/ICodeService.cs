using Domain.Model;

namespace Web.Authorization
{
    public interface ICodeService
    {
        CodeAuthorization GenerateCode(string email);
        bool UpdateCode(Guid codeId, string email, string? code);
    }
}
