package cloud.underwaise.delegates;

import cloud.underwaise.processes.UnderwritingProcessInstanceWrapper;
import cloud.underwaise.repository.ApplicationRepository;
import cloud.underwaise.services.AnalyzeFormAiService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cibseven.bpm.engine.delegate.DelegateExecution;
import org.cibseven.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

@Component
@Slf4j
@RequiredArgsConstructor
public class EvaluateRiskOfSportActivitiesDelegate implements JavaDelegate {

    private final AnalyzeFormAiService analyzeFormAiService;
    private ApplicationRepository applicationRepository;

    @Override
    public void execute(DelegateExecution delegateExecution) {
        log.info("Evaluate Risk of Sport Activities...");

        var underwritingProcess = new UnderwritingProcessInstanceWrapper(delegateExecution);
        var application = applicationRepository.getReferenceById(underwritingProcess.getApplicationId());

        if (application.getApplicationForm().getSpecialSportActivities() != null && !application.getApplicationForm().getSpecialSportActivities().isEmpty()) {
            var risk = analyzeFormAiService.getRiskForSpecialSportActivities(application.getApplicationForm().getSpecialSportActivities());


        }
    }
}
