namespace Repository.Interface
{
    public interface IRepository<T>
    {
        T Get(Guid id);
        void Add(T entity);
        void Update(T entity);
        void Remove(T entity);
    }
}
