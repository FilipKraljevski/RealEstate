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
            if (id == Guid.Empty) 
            {
                throw new ArgumentNullException($"Document id not provided");
            }

            var filePath = Path.Combine(imageSettings.LocalPath, id.ToString());

            File.WriteAllBytes(filePath, content);
        }

        public string Get(Guid id)
        {
            if (id == Guid.Empty) 
            { 
                return string.Empty; 
            }

            var filePath = Path.Combine(imageSettings.LocalPath, id.ToString()); 

            if (!File.Exists(filePath)) 
            { 
                throw new FileNotFoundException($"Document {id} not found."); 
            } 

            var bytes = File.ReadAllBytes(filePath);

            return Convert.ToBase64String(bytes);
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
