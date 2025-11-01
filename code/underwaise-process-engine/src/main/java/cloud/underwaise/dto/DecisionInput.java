package cloud.underwaise.dto;

public record DecisionInput(Integer age, Double bmi, String smoker, String drugs, String sportRisk,
                            String physicalSeverity, String psychologicalSeverity, String medicationSeverity,
                            String workRestrictionSeverity) {
}
