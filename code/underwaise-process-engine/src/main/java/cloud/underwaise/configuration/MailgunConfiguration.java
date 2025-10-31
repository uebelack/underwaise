package cloud.underwaise.configuration;

import cloud.underwaise.UnderwaiseProperties;
import com.mailgun.api.v3.MailgunMessagesApi;
import com.mailgun.client.MailgunClient;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MailgunConfiguration {

    @Bean
    public MailgunMessagesApi mailgunClient(UnderwaiseProperties underwaiseProperties) {
        return MailgunClient.config(underwaiseProperties.getMailgunApiKey()).createApi(MailgunMessagesApi.class);
    }
}
