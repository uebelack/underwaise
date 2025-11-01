package cloud.underwaise.services;

import cloud.underwaise.UnderwaiseProperties;
import cloud.underwaise.ai.analyzeform.api.DefaultApi;
import cloud.underwaise.ai.analyzeform.model.UnderwriteRequest;
import cloud.underwaise.ai.analyzeform.model.UnderwriteResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AnalyzeFormAiService {

    private final UnderwaiseProperties underwaiseProperties;

    public UnderwriteResponse getRiskFromHobbiesGetRiskFromHobbiesPost() {
        var api = new DefaultApi();
        api.getApiClient().setBasePath(underwaiseProperties.getAnalyzeFormAiUrl());
        return api.getRiskFromHobbiesGetRiskFromHobbiesPost(createUnderwriteRequest());
    }

    private UnderwriteRequest createUnderwriteRequest() {
        var request = new UnderwriteRequest();
        return request;
    }
}
