using System.ComponentModel;

namespace Domain.Enum
{
    [Flags]
    public enum RoleType
    {
        [Description("Agency")]
        Agency = 1 << 1,

        [Description("Admin")]
        Admin = 1 << 2
    }
}
