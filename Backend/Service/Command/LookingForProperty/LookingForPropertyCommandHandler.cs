using Domain.Model;
using MediatR;
using Repository.Interface;
using Service.Email;

namespace Service.Command.LookingForProperty
{
    public class LookingForPropertyCommandHandler : IRequestHandler<LookingForPropertyCommand, Result<bool>>
    {
        private readonly IMailLogRepository mailLogRepository;
        private readonly IAgencyRepository agencyRepository;
        private readonly IEmailService emailService;

        public LookingForPropertyCommandHandler(IMailLogRepository mailLogRepository, IAgencyRepository agencyRepository, IEmailService emailService)
        {
            this.mailLogRepository = mailLogRepository;
            this.agencyRepository = agencyRepository;
            this.emailService = emailService;
        }

        public async Task<Result<bool>> Handle(LookingForPropertyCommand request, CancellationToken cancellationToken)
        {
            var agencies = agencyRepository.GetByCountry(request.LookingForPropertyRequest.Country);

            if(agencies != null)
            {
                string header = "User: " + request.LookingForPropertyRequest.Name + ", " + request.LookingForPropertyRequest.Email;
                string message = "Message: " + request.LookingForPropertyRequest.Message;
                string info = "PurchaseType: " + request.LookingForPropertyRequest.PurchaseType +
                             "\n EstateType: " + request.LookingForPropertyRequest.PurchaseType +
                             "\n Country: " + request.LookingForPropertyRequest.PurchaseType +
                             "\n City: " + request.LookingForPropertyRequest.PurchaseType +
                             "\n Municipality: " + request.LookingForPropertyRequest.PurchaseType +
                             "\n AreaFrom: " + request.LookingForPropertyRequest.PurchaseType +
                             "\n AreaTo: " + request.LookingForPropertyRequest.PurchaseType +
                             "\n MaxPrice: " + request.LookingForPropertyRequest.PurchaseType +
                             "\n YearOfConstruction: " + request.LookingForPropertyRequest.PurchaseType +
                             "\n Rooms: " + request.LookingForPropertyRequest.PurchaseType +
                             "\n FloorFrom: " + request.LookingForPropertyRequest.PurchaseType +
                             "\n FloorTo: " + request.LookingForPropertyRequest.PurchaseType +
                             "\n Terrace: " + request.LookingForPropertyRequest.PurchaseType +
                             "\n Heating: " + request.LookingForPropertyRequest.PurchaseType +
                             "\n Parking: " + request.LookingForPropertyRequest.PurchaseType +
                             "\n Elevator: " + request.LookingForPropertyRequest.PurchaseType +
                             "\n Basement: " + request.LookingForPropertyRequest.PurchaseType;

                string body = header + "\n" + message + "\n" + info;

                emailService.SendEmailToAgencies(agencies.ToList(), "Looking for Property", body);
            }

            emailService.SendReceivedEmail(request.LookingForPropertyRequest.Name, request.LookingForPropertyRequest.Email);

            var mailLog = new MailLog()
            {
                From = request.LookingForPropertyRequest.Email,
                Subject = "Looking for Property",
                DateSent = DateTime.Now
            };

            mailLogRepository.Add(mailLog);

            return new OkResult<bool>(true);
        }
    }
}
