package cloud.underwaise.services;

import cloud.underwaise.model.Application;
import cloud.underwaise.model.ApplicationForm;
import cloud.underwaise.processes.UnderwritingProcess;
import cloud.underwaise.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.cibseven.bpm.engine.RuntimeService;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class UnderwritingService {
    private final RuntimeService runtimeService;
    private final ApplicationRepository applicationRepository;

    @Transactional
    public Application start(ApplicationForm applicationForm) {
        // Create and persist the application
        var application = new Application();
        application.setApplicationForm(applicationForm);

        Application savedApplication = applicationRepository.save(application);
        log.info("Application saved with ID: {}", savedApplication.getId());

        // Start the process with the application ID as a process variable
        runtimeService.startProcessInstanceByKey(
                UnderwritingProcess.PROCESS_DEFINITION_KEY,
                Map.of("applicationId", savedApplication.getId())
        );

        return savedApplication;
    }

    public Application findById(Long id) {
        return applicationRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Application not found with ID: " + id));
    }

    public Application findByEmail(String email) {
        return applicationRepository.findByApplicationFormEmail(email)
                .orElseThrow(() -> new RuntimeException("Application not found with email: " + email));
    }
}
