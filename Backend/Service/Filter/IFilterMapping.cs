using System.Linq.Expressions;

namespace Service.Filter
{
    public interface IFilterMapping<Filter, Model>
    {
        Dictionary<string, Func<Filter, object?, Expression<Func<Model, bool>>>> GetMappings();
    }
}
