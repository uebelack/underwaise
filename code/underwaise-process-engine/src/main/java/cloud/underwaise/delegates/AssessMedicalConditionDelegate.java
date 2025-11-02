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
public class AssessMedicalConditionDelegate implements JavaDelegate {

    private final AnalyzeFormAiService analyzeFormAiService;
    private final ApplicationRepository applicationRepository;

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        log.info("Assessing medications information via AI service...");

        var underwritingProcess = new UnderwritingProcessInstanceWrapper(delegateExecution);
        var application = applicationRepository.getReferenceById(underwritingProcess.getApplicationId());

        if (!application.getApplicationForm().getMedicationForm().isEmpty()) {
            var risk = analyzeFormAiService.accessRiskFromMedications(application.getApplicationForm().getMedicationForm());

            if (risk != null) {
                application.getApplicationFeature().setMedicationHealthScore(new BigDecimal(risk.toString()));
            }
        }
    }
}
