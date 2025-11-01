package cloud.underwaise.mapper;

import cloud.underwaise.ai.analyzeform.model.FlexibleHealthRequest;
import cloud.underwaise.model.HealthConditionForm;

import java.util.List;

public class HealthConditionListToTreatmentsMapper {

    public static FlexibleHealthRequest map(List<HealthConditionForm> healthConditionForm) {
        FlexibleHealthRequest request = new FlexibleHealthRequest();
        if (healthConditionForm == null || healthConditionForm.isEmpty()) {
            return request;
        }

        for (HealthConditionForm form : healthConditionForm) {
            var treatmentItem = new java.util.HashMap<String, Object>();
            treatmentItem.put("period_start", form.getStartDate() != null ? form.getStartDate().toString() : null);
            treatmentItem.put("period_end", form.getEndDate() != null ? form.getEndDate().toString() : null);
            treatmentItem.put("reason", form.getReason());
            treatmentItem.put("treatment_completed", form.isTreatmentCompleted());
            treatmentItem.put("therapist_address", form.getTreatmentFacilityAddress());
            request.addTreatmentsItem(treatmentItem);
        }
        return request;
    }
}
