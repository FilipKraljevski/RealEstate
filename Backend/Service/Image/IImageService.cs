namespace Service.Image
{
    public interface IImageService
    {
        string Get(Guid id);
        List<string> Get(List<Guid> ids);
        void Add(Guid id, byte[] content);
        void Remove(Guid id);
    }
}
