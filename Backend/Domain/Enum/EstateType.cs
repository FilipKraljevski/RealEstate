using System.ComponentModel;

namespace Domain.Enum
{
    public enum EstateType
    {
        [Description("House")]
        House = 1,

        [Description("Apartment")]
        Apartment = 2,

        [Description("Office")]
        Office = 3,

        [Description("Shop")]
        Shop = 4,

        [Description("Werehouse")]
        Werehouse = 5,

        [Description("Land")]
        Land = 6
    }
}
