namespace Repository.Interface
{
    public interface IRepository<T>
    {
        IEnumerable<T> GetAll();
        T Get(Guid id);
        void Add(T entity);
        void Update(T entity);
        void Remove(T entity);
    }
}
