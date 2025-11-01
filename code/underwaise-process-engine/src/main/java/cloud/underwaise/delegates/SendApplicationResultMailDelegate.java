package cloud.underwaise.delegates;

import cloud.underwaise.processes.UnderwritingProcessInstanceWrapper;
import cloud.underwaise.repository.ApplicationRepository;
import cloud.underwaise.services.MailService;
import lombok.RequiredArgsConstructor;
import org.cibseven.bpm.engine.delegate.DelegateExecution;
import org.cibseven.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class SendApplicationResultMailDelegate implements JavaDelegate {

    private final MailService mailService;

    private final ApplicationRepository applicationRepository;

    @Override
    public void execute(DelegateExecution delegateExecution) {
        var underwritingProcess = new UnderwritingProcessInstanceWrapper(delegateExecution);
        var application = applicationRepository.getReferenceById(underwritingProcess.getApplicationId());
        mailService.sendApplicationMail(application);
    }
}
