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
public class AssessMentalHealthDelegate implements JavaDelegate {

    private final AnalyzeFormAiService analyzeFormAiService;
    private final ApplicationRepository applicationRepository;

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        log.info("Assessing Mental Health condition Risks...");

        var underwritingProcess = new UnderwritingProcessInstanceWrapper(delegateExecution);
        var application = applicationRepository.getReferenceById(underwritingProcess.getApplicationId());

        if (!application.getApplicationForm().getMentalHealthConditions().isEmpty()) {
            var risk = analyzeFormAiService.accessRiskForMentalHealthCondition(application.getApplicationForm().getMentalHealthConditions());

            if (risk != null) {
                application.getApplicationFeature().setPsychologicalHealthScore(new BigDecimal(risk.toString()));
            }
        }
    }
}