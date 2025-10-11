using Domain.Enum;

namespace Domain.Extensions
{
    public static class RoleExtensions
    {
        public static bool HasRole(this int roles, RoleType roleToCheck)
        {
            return ((RoleType)roles).HasFlag(roleToCheck);
        }
    }
}
