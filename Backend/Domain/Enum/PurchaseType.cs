using System.ComponentModel;

namespace Domain.Enum
{
    public enum PurchaseType
    {
        [Description("Purchase")]
        Purchase = 1,

        [Description("Rent")]
        Rent = 2,

        [Description("ShortPeriod")]
        ShortPeriod = 3
    }
}
