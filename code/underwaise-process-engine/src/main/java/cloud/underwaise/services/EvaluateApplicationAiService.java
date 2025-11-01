package cloud.underwaise.services;

import cloud.underwaise.UnderwaiseProperties;
import cloud.underwaise.ai.evaluateapplication.api.DefaultApi;
import cloud.underwaise.ai.evaluateapplication.model.InferenceRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EvaluateApplicationAiService {

    private final UnderwaiseProperties underwaiseProperties;

    public Object evaluateApplication() {
        var api = new DefaultApi();
        api.getApiClient().setBasePath(underwaiseProperties.getEvaluateApplicationAiUrl());

        return api.inferInferPost(createInferenceRequest());
    }

    private InferenceRequest createInferenceRequest() {
        var request = new InferenceRequest();
        return request;
    }
}
