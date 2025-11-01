package cloud.underwaise.services;

import cloud.underwaise.UnderwaiseProperties;
import cloud.underwaise.ai.analyzeform.api.DefaultApi;
import cloud.underwaise.ai.analyzeform.model.TreatmentRiskScore;
import cloud.underwaise.ai.analyzeform.model.UnderwriteRequest;
import cloud.underwaise.mapper.HealthConditionListToTreatmentsMapper;
import cloud.underwaise.model.HealthConditionForm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class AnalyzeFormAiService {

    private final UnderwaiseProperties underwaiseProperties;

    public Integer getRiskForSpecialSportActivities(String sportActivities) {
        log.info("Sending request to AnalyseForm AI to assess dangerous sports information: {}", sportActivities);
        var api = new DefaultApi();
        api.getApiClient().setBasePath(underwaiseProperties.getAnalyzeFormAiUrl());

        var underwriteRequest = new UnderwriteRequest();
        underwriteRequest.setText(sportActivities);
        var result = api.getRiskFromHobbiesGetRiskFromHobbiesPost(underwriteRequest);

        log.info("AI reasoning results: {} {}", result.getRiskScore(), result.getExplanation());
        return result.getRiskScore();
    }

    public Integer accessRiskForPhysicalHealthCondition(List<HealthConditionForm> physicalHealthConditions) {
        log.debug("Sending request to AnalyzeForm AI to assess physical health report: {}", physicalHealthConditions);
        var api = new DefaultApi();
        api.getApiClient().setBasePath(underwaiseProperties.getAnalyzeFormAiUrl());
        var result = api.assessPhysicalHealthAssessPhysicalHealthPost(
                HealthConditionListToTreatmentsMapper.map(physicalHealthConditions));

        log.info("AI overall estimate: [{}] [{}]", result.getOverallRiskScore(), result.getSummary());
        return result.getTreatmentScores().stream().mapToInt(TreatmentRiskScore::getRiskScore).max().orElse(0);
    }

    public Integer accessRiskForMentalHealthCondition(List<HealthConditionForm> mentalHealthConditions) {
        log.debug("Sending request to AnalyzeForm AI to assess mental health report: {}", mentalHealthConditions);
        var api = new DefaultApi();
        api.getApiClient().setBasePath(underwaiseProperties.getAnalyzeFormAiUrl());
        var result = api.assessMentalHealthAssessMentalHealthPost(
                HealthConditionListToTreatmentsMapper.map(mentalHealthConditions));

        log.info("AI overall estimate: [{}] [{}]", result.getOverallRiskScore(), result.getSummary());
        return result.getTreatmentScores().stream().mapToInt(TreatmentRiskScore::getRiskScore).max().orElse(0);
    }
}
