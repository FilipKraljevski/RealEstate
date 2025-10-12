using Domain.Model;
using MediatR;
using Repository.Interface;
using Service.Email;

namespace Service.Command.Contact
{
    public class ContactCommandHandler : IRequestHandler<ContactCommand, Result<bool>>
    {
        private readonly IMailLogRepository mailLogRepository;
        private readonly IEmailService emailService;

        public ContactCommandHandler(IMailLogRepository mailLogRepository, IEmailService emailService)
        {
            this.mailLogRepository = mailLogRepository;
            this.emailService = emailService;
        }

        public async Task<Result<bool>> Handle(ContactCommand request, CancellationToken cancellationToken)
        {
            emailService.SendEmail(request.ContactRequest.Subject, request.ContactRequest.Body);

            emailService.SendReceivedEmail(request.ContactRequest.Name, request.ContactRequest.Email);

            var mailLog = new MailLog()
            {
                From = request.ContactRequest.Email,
                Subject = request.ContactRequest.Subject,
                DateSent = DateTime.Now
            };

            mailLogRepository.Add(mailLog);

            return new OkResult<bool>(true);
        }
    }
}
