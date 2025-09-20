using LinqKit;
using Service.Filter;

namespace Repository.Helper
{
    public static class FilterBuilder<Filter, FilterMapper, Model> where FilterMapper : IFilterMapping<Filter, Model>
    {
        public static ExpressionStarter<Model> Build(Filter filters, FilterMapper mapper)
        {
            var predicate = PredicateBuilder.New<Model>(true);

            foreach (var prop in typeof(Filter).GetProperties())
            {
                var value = prop.GetValue(filters);
                if (value == null) continue;

                if (mapper.GetMappings().TryGetValue(prop.Name, out var exprFactory))
                {
                    var expr = exprFactory(filters, value);
                    predicate = predicate.And(expr);
                }
            }

            return predicate;
        }
    }
}
