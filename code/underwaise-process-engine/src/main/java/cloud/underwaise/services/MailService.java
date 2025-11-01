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
        var message = Message.builder().from("Underwaise <no-reply@%s>".formatted(underwaiseProperties.getMailgunDomain()))
                .to(application.getApplicationForm().getEmail())
                .subject("Your Application for the Life Spar Lebensversicherung")
                .text("Hallo %s,\n\nthank you for your application! We will get back to you soon.".formatted()
                        application.getApplicationForm().getFirstName()
                ).build();

        mailgunMessagesApi.sendMessage(underwaiseProperties.getMailgunDomain(), message);
    }
}
