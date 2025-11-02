package cloud.underwaise.services;

import cloud.underwaise.UnderwaiseProperties;
import cloud.underwaise.ai.evaluateapplication.api.InferenceApi;
import cloud.underwaise.ai.evaluateapplication.model.InferenceRequest;
import cloud.underwaise.model.Application;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class EvaluateApplicationAiService {

    private final UnderwaiseProperties underwaiseProperties;

    public void evaluateApplication(Application application) {
        var inferenceApi = new InferenceApi();
        inferenceApi.getApiClient().setBasePath(underwaiseProperties.getEvaluateApplicationAiUrl());
        var request = new InferenceRequest();


        request.setData(List.of(application.getApplicationFeature().getFeatureVector()));
        request.setModelFile("svm_model.joblib");
        request.setScalerFile("scaler.joblib");

        var result = inferenceApi.inferInferPost(request);

        if (!result.getPredictions().isEmpty()) {
            application.setStatusML(result.getPredictions().get(0));
        }
    }

}
