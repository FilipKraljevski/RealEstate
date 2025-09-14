using Microsoft.EntityFrameworkCore;
using Repository.Interface;

namespace Repository.Implementation
{
    public class Repository<T> : IRepository<T>where T : class
    {
        protected readonly RealEstateDbContext realEstateDbContext;
        protected DbSet<T> entities;

        public Repository(RealEstateDbContext realEstateDbContext)
        {
            this.realEstateDbContext = realEstateDbContext;
            entities = realEstateDbContext.Set<T>();
        }

        public IEnumerable<T> GetAll()
        {
            return entities.AsEnumerable();
        }

        public T Get(Guid id)
        {
            return entities.SingleOrDefault(x => (Guid)typeof(T).GetProperty("Id").GetValue(x, null) == id);
        }

        public void Add(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity is null");
            }

            entities.Add(entity);
            realEstateDbContext.SaveChanges();
        }

        public void Update(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity is null");
            }

            entities.Update(entity);
            realEstateDbContext.SaveChanges();
        }

        public void Remove(T entity)
        {
            if (entity == null)
            {
                throw new ArgumentNullException("entity is null");
            }

            entities.Remove(entity);
            realEstateDbContext.SaveChanges();
        }
    }
}
