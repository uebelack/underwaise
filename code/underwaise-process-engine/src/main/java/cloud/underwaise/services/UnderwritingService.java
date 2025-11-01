package cloud.underwaise.services;

import cloud.underwaise.UnderwaiseProperties;
import cloud.underwaise.model.Application;
import cloud.underwaise.model.ApplicationFeature;
import cloud.underwaise.model.ApplicationForm;
import cloud.underwaise.processes.UnderwritingProcessInstanceWrapper;
import cloud.underwaise.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cibseven.bpm.engine.RuntimeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

import static cloud.underwaise.processes.UnderwritingProcessInstanceWrapper.APPLICATION_ID_VARIABLE;
import static cloud.underwaise.processes.UnderwritingProcessInstanceWrapper.TRAINING_VARIABLE;

@Service
@RequiredArgsConstructor
@Slf4j
public class UnderwritingService {
    private final RuntimeService runtimeService;
    private final ApplicationRepository applicationRepository;
    private final UnderwaiseProperties underwaiseProperties;

    private static void assignFkToChildEntities(ApplicationForm applicationForm) {
        applicationForm.getPhysicalHealthConditions().forEach(condition -> {
            condition.setApplicationForm(applicationForm);
        });

        applicationForm.getMentalHealthConditions().forEach(condition -> {
            condition.setApplicationForm(applicationForm);
        });

        applicationForm.getMedicationForm().forEach(medication -> {
            medication.setApplicationForm(applicationForm);
        });

        applicationForm.getIncapacityForm().forEach(incapacity -> {
            incapacity.setApplicationForm(applicationForm);
        });
    }

    @Transactional
    public Application start(ApplicationForm applicationForm) {
        // Set the parent reference for all child entities before saving
        assignFkToChildEntities(applicationForm);

        var application = new Application();
        application.setApplicationForm(applicationForm);
        application.setApplicationFeature(new ApplicationFeature());
        Application savedApplication = applicationRepository.save(application);

        runtimeService.startProcessInstanceByKey(
                UnderwritingProcessInstanceWrapper.PROCESS_DEFINITION_KEY,
                Map.of(APPLICATION_ID_VARIABLE, savedApplication.getApplicationUuid(),
                        TRAINING_VARIABLE, underwaiseProperties.isTrainingActive())
        );

        return savedApplication;
    }
}
