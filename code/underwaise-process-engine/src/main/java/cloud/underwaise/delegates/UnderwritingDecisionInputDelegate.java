package cloud.underwaise.delegates;

import cloud.underwaise.dto.DecisionInput;
import cloud.underwaise.enums.Risk;
import cloud.underwaise.enums.YesNo;
import cloud.underwaise.processes.UnderwritingProcessInstanceWrapper;
import cloud.underwaise.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cibseven.bpm.engine.delegate.DelegateExecution;
import org.cibseven.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class UnderwritingDecisionInputDelegate implements JavaDelegate {

    private final ApplicationRepository applicationRepository;

    @Override
    public void execute(DelegateExecution delegateExecution) {
        log.info("Will prepare data for underwriting business rule decision ...");

        var underwritingProcess = new UnderwritingProcessInstanceWrapper(delegateExecution);

        var application = applicationRepository.getReferenceById(underwritingProcess.getApplicationId());
        var applicationFeature = application.getApplicationFeature();

        var age = applicationFeature.getAge();
        var bmi = applicationFeature.getBmi().doubleValue();
        var smoker = YesNo.fromValue(applicationFeature.getSmoker()).getValue();
        var drugs = YesNo.fromValue(applicationFeature.getDrugs()).getValue();

        var sportRisk = Risk.fromValue(applicationFeature.getHobbyScore()).getValue();
        var physicalSeverity = Risk.fromValue(applicationFeature.getPhysicalHealthScore()).getValue();
        var psychologicalSeverity = Risk.fromValue(applicationFeature.getPsychologicalHealthScore()).getValue();
        var medicationSeverity = Risk.fromValue(applicationFeature.getMedicationHealthScore()).getValue();
        var workRestrictionSeverity = Risk.fromValue(applicationFeature.getRestrictionsScore()).getValue();


        var decisionInput = new DecisionInput(
                age,
                bmi,
                smoker,
                drugs,
                sportRisk,
                physicalSeverity,
                psychologicalSeverity,
                medicationSeverity,
                workRestrictionSeverity
        );

        underwritingProcess.setUnderwritingDecisionInput(decisionInput);
    }
}
