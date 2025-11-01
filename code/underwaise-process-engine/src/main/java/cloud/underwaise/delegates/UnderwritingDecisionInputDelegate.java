package cloud.underwaise.delegates;

import cloud.underwaise.dto.DecisionInput;
import cloud.underwaise.enums.Risk;
import cloud.underwaise.enums.YesNo;
import cloud.underwaise.processes.UnderwritingProcessInstanceWrapper;
import lombok.extern.slf4j.Slf4j;
import org.cibseven.bpm.engine.delegate.DelegateExecution;
import org.cibseven.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class UnderwritingDecisionInputDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution delegateExecution) {
        log.info("Will prepare data for underwriting business rule decision ...");

        var underwritingProcess = new UnderwritingProcessInstanceWrapper(delegateExecution);

        var age = 55;
        var bmi = 32.5;
        var smoker = YesNo.fromValue(true).getValue();
        var drugs = YesNo.fromValue(true).getValue();
        var sportRisk = Risk.fromValue(7).getValue();
        var physicalSeverity = YesNo.fromValue(true).getValue();
        var psychologicalSeverity = YesNo.fromValue(false).getValue();
        var medicationSeverity = YesNo.fromValue(true).getValue();
        var workRestrictionSeverity = YesNo.fromValue(false).getValue();


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
