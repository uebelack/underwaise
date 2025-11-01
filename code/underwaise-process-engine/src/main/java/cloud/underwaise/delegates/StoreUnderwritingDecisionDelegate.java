package cloud.underwaise.delegates;

import cloud.underwaise.processes.UnderwritingProcessInstanceWrapper;
import lombok.extern.slf4j.Slf4j;
import org.cibseven.bpm.engine.delegate.DelegateExecution;
import org.cibseven.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

import static cloud.underwaise.processes.UnderwritingProcessInstanceWrapper.DECISION;

@Component
@Slf4j
public class StoreUnderwritingDecisionDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution delegateExecution) {
        log.info("Will store underwriting decision ...");

        var underwritingProcess = new UnderwritingProcessInstanceWrapper(delegateExecution);
        var underwritingDecisionResult = underwritingProcess.getUnderwritingDecisionResult();

        underwritingProcess.setDecision(underwritingDecisionResult.get(DECISION).toString());
    }
}
