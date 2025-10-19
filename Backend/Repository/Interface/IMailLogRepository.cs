using Domain.Model;

namespace Repository.Interface
{
    public interface IMailLogRepository
    {
        public void Add(MailLog entity);
    }
}
