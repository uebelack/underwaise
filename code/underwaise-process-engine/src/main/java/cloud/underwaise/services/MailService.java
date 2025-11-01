package cloud.underwaise.services;

import cloud.underwaise.UnderwaiseProperties;
import cloud.underwaise.model.Application;
import com.mailgun.api.v3.MailgunMessagesApi;
import com.mailgun.model.message.Message;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {
    private final MailgunMessagesApi mailgunMessagesApi;
    private final UnderwaiseProperties underwaiseProperties;

    public void sendApplicationMail(Application application) {

        var text = new StringBuilder();

        text.append("Dear %s %s,\n\n".formatted(application.getApplicationForm().getFirstName(), application.getApplicationForm().getLastName()));
        text.append("\n\n");
        text.append("Thank you for your application for Spar Lebensversicherung.\n\n");
        text.append("\n\n");
        text.append("\n\n");

        if (application.getStatus().equals("Acceptance")) {
            text.append("We are pleased to inform you that your application has been accepted. Our team will contact you shortly with further details regarding your policy.\n\n");
        } else if (application.getStatus().equals("Rejection")) {
            text.append("We regret to inform you that your application has been rejected based on our underwriting criteria. If you have any questions or would like to discuss this decision, please feel free to reach out to our support team.\n\n");
            text.append("\n\n");
            text.append("Reason for rejection: %s\n\n".formatted(application.getReason()));
        } else {
            text.append("Your application is currently under review. We will notify you once a decision has been made. Thank you for your patience.\n\n");
        }

        text.append("\n\n");
        text.append("Best regards,\n");
        text.append("The Underwaise Team\n");

        text.append("----------------------------------------------\n\n");
        text.append("Technical details:\n");
        text.append("Business Rules based decision: %s\n".formatted(application.getStatus()));
        text.append("ML Model based decision: %s\n".formatted(application.getStatusML()));

        var message = Message.builder().from("Underwaise <no-reply@%s>".formatted(underwaiseProperties.getMailgunDomain()))
                .to(application.getApplicationForm().getEmail())
                .subject("👩‍💼Your Application for Spar Lebensversicherung")
                .text(text.toString()
                ).build();

        mailgunMessagesApi.sendMessage(underwaiseProperties.getMailgunDomain(), message);
    }
}
