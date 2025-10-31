package cloud.underwaise.services;

import cloud.underwaise.model.Application;
import cloud.underwaise.model.ApplicationForm;
import cloud.underwaise.processes.UnderwritingProcess;
import lombok.RequiredArgsConstructor;
import org.cibseven.bpm.engine.RuntimeService;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UnderwritingService {
    private final RuntimeService runtimeService;

    public void start(ApplicationForm applicationForm) {
        var application = new Application();
        application.setApplicationForm(applicationForm);

        runtimeService.startProcessInstanceByKey(UnderwritingProcess.PROCESS_DEFINITION_KEY);
    }
}
