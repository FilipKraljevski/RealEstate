using Domain.Model;

namespace Web.Authorization
{
    public interface ICodeService
    {
        CodeAuthorization GenerateCode(string username, bool isAgency = true);
        bool UpdateCode(Guid codeId, string username, string? code, bool isAgency = true);
    }
}
