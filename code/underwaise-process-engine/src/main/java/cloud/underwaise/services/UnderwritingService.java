package cloud.underwaise.services;

import cloud.underwaise.model.Application;
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

@Service
@RequiredArgsConstructor
@Slf4j
public class UnderwritingService {
    private final RuntimeService runtimeService;
    private final ApplicationRepository applicationRepository;

    @Transactional
    public Application start(ApplicationForm applicationForm) {
        var application = new Application();
        application.setApplicationForm(applicationForm);

        Application savedApplication = applicationRepository.save(application);

        runtimeService.startProcessInstanceByKey(
                UnderwritingProcessInstanceWrapper.PROCESS_DEFINITION_KEY,
                Map.of(APPLICATION_ID_VARIABLE, savedApplication.getId())
        );

        return savedApplication;
    }
}
