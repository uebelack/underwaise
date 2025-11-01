package cloud.underwaise.services;

import cloud.underwaise.UnderwaiseProperties;
import cloud.underwaise.ai.analyzeform.api.DefaultApi;
import cloud.underwaise.ai.analyzeform.model.UnderwriteRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnalyzeFormAiService {

    private final UnderwaiseProperties underwaiseProperties;

    public Integer getRiskForSpecialSportActivities(String sportActivities) {
        log.debug("Getting risk for sport activities: {}", sportActivities);
        var api = new DefaultApi();
        api.getApiClient().setBasePath(underwaiseProperties.getAnalyzeFormAiUrl());

        var underwriteRequest = new UnderwriteRequest();
        underwriteRequest.setText(sportActivities);
        var result = api.getRiskFromHobbiesGetRiskFromHobbiesPost(underwriteRequest);

        log.debug("risk result: {} {}", result.getRiskScore(), result.getExplanation());

        return result.getRiskScore();
    }
}
