namespace Service.Image
{
    public interface IImageService
    {
        string Get(Guid id);
        List<string> Get(List<Guid> ids);
        void Add(Guid id, Stream content);
        void Remove(Guid id);
    }
}
