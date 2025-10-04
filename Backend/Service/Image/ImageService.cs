using Microsoft.AspNetCore.StaticFiles;
using Microsoft.Extensions.Options;

namespace Service.Image
{
    public class ImageService : IImageService
    {
        private readonly ImageSettings imageSettings;

        public ImageService(IOptions<ImageSettings> options)
        {
            imageSettings = options.Value;
        }

        public void Add(Guid id, byte[] content)
        {
            if(id == Guid.Empty)
            {
                throw new ArgumentNullException($"Document id not provided");
            }

            var filePath = Path.Combine(imageSettings.LocalPath, id.ToString());

            var stream = new MemoryStream(content);
            
            if(stream.CanSeek)
            {
                stream.Position = 0;
            }

            var fileStream = File.Create(filePath);

            stream.CopyTo(fileStream);
        }

        public string Get(Guid id)
        {
            if (id == Guid.Empty)
            {
                return String.Empty;
            }

            var filePath = Path.Combine(imageSettings.LocalPath, id.ToString());

            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException($"Document {id} not found.");
            }

            var provider = new FileExtensionContentTypeProvider();
            
            if (!provider.TryGetContentType(filePath, out var contentType))
            {
                contentType = "application/octet-stream";
            }

            var memoryStream = new MemoryStream(File.ReadAllBytes(filePath));

            memoryStream.Position = 0;

            var base64 = Convert.ToBase64String(memoryStream.ToArray());

            return base64;
        }

        public List<string> Get(List<Guid> id)
        {
            List<string> imagesContent = new List<string>();

            foreach (var idItem in id) 
            {
                imagesContent.Add(Get(idItem));
            }

            return imagesContent;
        }

        public void Remove(Guid id)
        {
            var filePath = Path.Combine(imageSettings.LocalPath, id.ToString());

            if (!File.Exists(filePath))
            {
                throw new FileNotFoundException($"Document {id} not found.");
            }

            File.Delete(filePath);
        }
    }
}
