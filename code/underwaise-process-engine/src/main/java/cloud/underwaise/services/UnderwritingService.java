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

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.time.LocalDate;
import java.time.Period;
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
        application.setApplicationFeature(createApplicationFeature(applicationForm));
        Application savedApplication = applicationRepository.save(application);

        runtimeService.startProcessInstanceByKey(
                UnderwritingProcessInstanceWrapper.PROCESS_DEFINITION_KEY,
                Map.of(APPLICATION_ID_VARIABLE, savedApplication.getApplicationUuid(),
                        TRAINING_VARIABLE, underwaiseProperties.isTrainingActive())
        );

        return savedApplication;
    }

    private ApplicationFeature createApplicationFeature(ApplicationForm applicationForm) {
        var feature = new ApplicationFeature();
        feature.setSmoker(applicationForm.getIsSmoker());
        feature.setAge(calculateAge(applicationForm.getBirthDate()));
        feature.setBmi(calculateBmi(applicationForm.getHeight(), applicationForm.getWeight()));
        return feature;
    }

    private BigDecimal calculateBmi(int height, int weight) {
        BigDecimal heightInMeters = BigDecimal.valueOf(height).divide(BigDecimal.valueOf(100));
        BigDecimal heightSquared = heightInMeters.multiply(heightInMeters);
        return BigDecimal.valueOf(weight).divide(heightSquared, 2, RoundingMode.HALF_UP);
    }

    private int calculateAge(LocalDate date) {
        LocalDate today = LocalDate.now();
        return Period.between(date, today).getYears();
    }

}
