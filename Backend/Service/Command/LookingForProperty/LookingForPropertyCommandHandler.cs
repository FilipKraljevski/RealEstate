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
                string telephone = "Telephone: " + request.LookingForPropertyRequest.Telephone;
                string message = "Message: " + request.LookingForPropertyRequest.Message;
                string info = "Purchase Type: " + request.LookingForPropertyRequest.PurchaseType +
                             "\n Estate Type: " + request.LookingForPropertyRequest.EstateType +
                             "\n Country: " + request.LookingForPropertyRequest.Country +
                             "\n City: " + request.LookingForPropertyRequest.City +
                             "\n Municipality: " + request.LookingForPropertyRequest.Municipality +
                             "\n Area From: " + request.LookingForPropertyRequest.AreaFrom +
                             "\n Area To: " + request.LookingForPropertyRequest.AreaTo +
                             "\n Max Price: " + request.LookingForPropertyRequest.MaxPrice +
                             "\n Year Of Construction: " + request.LookingForPropertyRequest.YearOfConstruction +
                             "\n Rooms: " + request.LookingForPropertyRequest.Rooms +
                             "\n Floor From: " + request.LookingForPropertyRequest.FloorFrom +
                             "\n Floor To: " + request.LookingForPropertyRequest.FloorTo +
                             "\n Terrace: " + request.LookingForPropertyRequest.Terrace +
                             "\n Heating: " + request.LookingForPropertyRequest.Heating +
                             "\n Parking: " + request.LookingForPropertyRequest.Parking +
                             "\n Elevator: " + request.LookingForPropertyRequest.Elevator +
                             "\n Basement: " + request.LookingForPropertyRequest.Basement;

                string body = header + "\n" + telephone + message + "\n" + info;

                emailService.SendEmailToAgencies(agencies.ToList(), "User " + request.LookingForPropertyRequest.Name + " Looking for Property", body, null);
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
