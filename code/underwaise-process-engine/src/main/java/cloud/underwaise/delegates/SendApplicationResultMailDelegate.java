package cloud.underwaise.delegates;

import cloud.underwaise.model.Application;
import cloud.underwaise.model.ApplicationForm;
import cloud.underwaise.services.MailService;
import lombok.RequiredArgsConstructor;
import org.cibseven.bpm.engine.delegate.DelegateExecution;
import org.cibseven.bpm.engine.delegate.JavaDelegate;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class SendApplicationResultMailDelegate implements JavaDelegate {

    private final MailService mailService;

    @Override
    public void execute(DelegateExecution delegateExecution) throws Exception {
        var application = new Application();
        application.setApplicationForm(new ApplicationForm("John", "Doe", LocalDate.of(2000, 1, 1), "david@uebelacker.dev", true, "Test", "Test"));
        mailService.sendApplicationMail(application);
    }
}
