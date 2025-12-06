namespace Web.Authentication
{
    public interface ILoginService
    {
        bool AreCredentialsValid(string email, string password);
        string GenerateToken(string email);
    }
}
