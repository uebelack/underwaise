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
public class AssessWorkDisabiltyDelegate implements JavaDelegate {
    private final AnalyzeFormAiService analyzeFormAiService;
    private final ApplicationRepository applicationRepository;

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        log.info("Assessing work disability condition risks...");

        var underwritingProcess = new UnderwritingProcessInstanceWrapper(delegateExecution);
        var application = applicationRepository.getReferenceById(underwritingProcess.getApplicationId());

        if (!application.getApplicationForm().getIncapacityForm().isEmpty()) {
            var risk = analyzeFormAiService.accessRiskFromWorkDisability(application.getApplicationForm().getIncapacityForm());

            if (risk != null) {
                application.getApplicationFeature().setRestrictionsScore(new BigDecimal(risk.toString()));
            }
        } else {
            // No work disability information provided, set a positive score
            application.getApplicationFeature().setRestrictionsScore(new BigDecimal("0.5"));
        }
    }
}
