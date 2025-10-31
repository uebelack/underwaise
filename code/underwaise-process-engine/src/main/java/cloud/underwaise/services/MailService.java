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
                .to(application.getApplicationForm().email())
                .subject("Test")
                .text("This is a test email.")
                .build();

        mailgunMessagesApi.sendMessage(underwaiseProperties.getMailgunDomain(), message);
    }
}
