using Domain.Model;
using MediatR;
using Repository.Interface;
using Service.Email;

namespace Service.Command.YourOffer
{
    public class YourOfferCommandHandler : IRequestHandler<YourOfferCommand, Result<bool>>
    {
        private readonly IMailLogRepository mailLogRepository;
        private readonly IAgencyRepository agencyRepository;
        private readonly IEmailService emailService;

        public YourOfferCommandHandler(IMailLogRepository mailLogRepository, IAgencyRepository agencyRepository, IEmailService emailService)
        {
            this.mailLogRepository = mailLogRepository;
            this.agencyRepository = agencyRepository;
            this.emailService = emailService;
        }

        public async Task<Result<bool>> Handle(YourOfferCommand request, CancellationToken cancellationToken)
        {
            var agencies = agencyRepository.GetByCountry(request.YourOfferRequest.Country);

            if (agencies != null)
            {
                string header = "User: " + request.YourOfferRequest.Name + ", " + request.YourOfferRequest.Email;
                string message = "Message: " + request.YourOfferRequest.Message;
                string info = "Purchase Type: " + request.YourOfferRequest.PurchaseType +
                             "\n Estate Type: " + request.YourOfferRequest.EstateType +
                             "\n Country: " + request.YourOfferRequest.Country +
                             "\n City: " + request.YourOfferRequest.City +
                             "\n Municipality: " + request.YourOfferRequest.Municipality +
                             "\n Area: " + request.YourOfferRequest.Area +
                             "\n Price: " + request.YourOfferRequest.Price +
                             "\n Year Of Construction: " + request.YourOfferRequest.YearOfConstruction +
                             "\n Rooms: " + request.YourOfferRequest.Rooms +
                             "\n Floor From: " + request.YourOfferRequest.FloorFrom +
                             "\n Floor To: " + request.YourOfferRequest.FloorTo +
                             "\n Terrace: " + request.YourOfferRequest.Terrace +
                             "\n Heating: " + request.YourOfferRequest.Heating +
                             "\n Parking: " + request.YourOfferRequest.Parking +
                             "\n Elevator: " + request.YourOfferRequest.Elevator +
                             "\n Basement: " + request.YourOfferRequest.Basement;

                string body = header + "\n" + message + "\n" + info;

                emailService.SendEmailToAgencies(agencies.ToList(), "Offer From User " + request.YourOfferRequest.Name, body, request.YourOfferRequest.Images);
            }

            emailService.SendReceivedEmail(request.YourOfferRequest.Name, request.YourOfferRequest.Email);

            var mailLog = new MailLog()
            {
                From = request.YourOfferRequest.Email,
                Subject = "Your Offer",
                DateSent = DateTime.Now
            };

            mailLogRepository.Add(mailLog);

            return new OkResult<bool>(true);
        }
    }
}
