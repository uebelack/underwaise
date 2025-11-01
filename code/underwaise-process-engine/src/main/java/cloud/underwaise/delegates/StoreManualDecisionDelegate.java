package cloud.underwaise.delegates;

import lombok.extern.slf4j.Slf4j;
import org.cibseven.bpm.engine.delegate.DelegateExecution;
import org.cibseven.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

@Component
@Slf4j
public class StoreManualDecisionDelegate implements JavaDelegate {
    @Override
    public void execute(DelegateExecution delegateExecution) {
        log.info("Will store manual decision to database ...");
    }
}
