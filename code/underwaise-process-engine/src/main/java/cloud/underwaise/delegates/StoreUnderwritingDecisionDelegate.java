package cloud.underwaise.delegates;

import cloud.underwaise.processes.UnderwritingProcessInstanceWrapper;
import cloud.underwaise.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cibseven.bpm.engine.delegate.DelegateExecution;
import org.cibseven.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

import static cloud.underwaise.processes.UnderwritingProcessInstanceWrapper.DECISION;
import static cloud.underwaise.processes.UnderwritingProcessInstanceWrapper.REASON;

@Component
@Slf4j
@RequiredArgsConstructor
public class StoreUnderwritingDecisionDelegate implements JavaDelegate {

    private final ApplicationRepository applicationRepository;

    @Override
    public void execute(DelegateExecution delegateExecution) {
        log.info("Will store underwriting decision ...");


        var underwritingProcess = new UnderwritingProcessInstanceWrapper(delegateExecution);
        var application = applicationRepository.getReferenceById(underwritingProcess.getApplicationId());

        var underwritingDecisionResult = underwritingProcess.getUnderwritingDecisionResult();

        var decision = underwritingDecisionResult.get(DECISION).toString();
        var reason = underwritingDecisionResult.get(REASON).toString();

        application.setStatus(decision);
        application.setReason(reason);

        underwritingProcess.setDecision(underwritingDecisionResult.get(DECISION).toString());
    }
}
