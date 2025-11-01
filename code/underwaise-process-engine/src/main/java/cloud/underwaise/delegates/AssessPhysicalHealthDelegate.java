package cloud.underwaise.delegates;

import cloud.underwaise.processes.UnderwritingProcessInstanceWrapper;
import cloud.underwaise.repository.ApplicationRepository;
import cloud.underwaise.services.AnalyzeFormAiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cibseven.bpm.engine.delegate.DelegateExecution;
import org.cibseven.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
@Slf4j
@RequiredArgsConstructor
public class AssessPhysicalHealthDelegate implements JavaDelegate {

    private final AnalyzeFormAiService analyzeFormAiService;
    private final ApplicationRepository applicationRepository;

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        log.info("Assess Physical Health Condition Risks...");

        var underwritingProcess = new UnderwritingProcessInstanceWrapper(delegateExecution);
        var application = applicationRepository.getReferenceById(underwritingProcess.getApplicationId());

        if (!application.getApplicationForm().getPhysicalHealthConditions().isEmpty()) {
            var risk = analyzeFormAiService.accessRiskForPhysicalHealthCondition(application.getApplicationForm().getPhysicalHealthConditions());

            if (risk != null) {
                application.getApplicationFeature().setPhysicalHealthScore(new BigDecimal(risk.toString()));
            }
        }
    }
}