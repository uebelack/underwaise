package cloud.underwaise;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "underwaise")
@Data
public class UnderwaiseProperties {
    private String analyzeFormAiUrl;
    private String evaluateApplicationAiUrl;
    private String mailgunApiKey;
    private String mailgunDomain;
    private boolean trainingActive;
}
