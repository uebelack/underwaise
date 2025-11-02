package cloud.underwaise.services;

import cloud.underwaise.UnderwaiseProperties;
import cloud.underwaise.ai.analyzeform.api.DefaultApi;
import cloud.underwaise.ai.analyzeform.model.TreatmentRiskScore;
import cloud.underwaise.ai.analyzeform.model.UnderwriteRequest;
import cloud.underwaise.model.HealthConditionForm;
import cloud.underwaise.model.MedicationForm;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        underwriteRequest.setSpecialSportActivities(sportActivities);
        var result = api.getRiskFromHobbiesGetRiskFromHobbiesPost(underwriteRequest);

        log.info("AI reasoning results: {} {}", result.getRiskScore(), result.getExplanation());
        return result.getRiskScore();
    }

    public Integer accessRiskForPhysicalHealthCondition(List<HealthConditionForm> physicalHealthConditions) {
        log.info("Sending request to AnalyzeForm AI to assess physical health report: {}", physicalHealthConditions);
        var api = new DefaultApi();
        api.getApiClient().setBasePath(underwaiseProperties.getAnalyzeFormAiUrl());
        var result = api.assessPhysicalHealthAssessPhysicalHealthPost(
                mapToRequest(physicalHealthConditions));

        log.info("AI overall estimate: [{}] [{}]", result.getOverallRiskScore(), result.getSummary());
        return result.getTreatmentScores().stream().mapToInt(TreatmentRiskScore::getRiskScore).max().orElse(0);
    }

    public Integer accessRiskForMentalHealthCondition(List<HealthConditionForm> mentalHealthConditions) {
        log.info("Sending request to AnalyzeForm AI to assess mental health report: {}", mentalHealthConditions);
        var api = new DefaultApi();
        api.getApiClient().setBasePath(underwaiseProperties.getAnalyzeFormAiUrl());
        var result = api.assessMentalHealthAssessMentalHealthPost(
                mapToRequest(mentalHealthConditions));

        log.info("AI overall estimate: [{}] [{}]", result.getOverallRiskScore(), result.getSummary());
        return result.getTreatmentScores().stream().mapToInt(TreatmentRiskScore::getRiskScore).max().orElse(0);
    }

    public Integer accessRiskFromMedications(List<MedicationForm> medicationForms) {
        log.info("Sending request to AnalyzeForm AI to assess medications report: {}", medicationForms);
        var api = new DefaultApi();
        api.getApiClient().setBasePath(underwaiseProperties.getAnalyzeFormAiUrl());
        var result = api.assessMedicationAssessMedicationPost(
                mapToRequest(medicationForms));

        log.info("AI overall estimate: [{}] [{}]", result.getOverallRiskScore(), result.getSummary());
        return result.getTreatmentScores().stream().mapToInt(TreatmentRiskScore::getRiskScore).max().orElse(0);
    }

    private static Map<String, Object> mapToRequest(List list) {
        Map<String, Object> map = new HashMap<>();
        if (list == null || list.isEmpty()) {
            return map;
        }
        map.put("validDictionary", list);
        return map;
    }
}
