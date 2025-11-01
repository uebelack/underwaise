package cloud.underwaise.processes;

import org.cibseven.bpm.engine.RuntimeService;
import org.cibseven.bpm.engine.delegate.DelegateExecution;
import org.cibseven.bpm.engine.impl.persistence.entity.ExecutionEntity;
import org.cibseven.bpm.engine.runtime.ProcessInstance;

import java.util.UUID;

public class UnderwritingProcessInstanceWrapper {
    public static final String PROCESS_DEFINITION_KEY = "underwriting";

    public static final String APPLICATION_ID_VARIABLE = "applicationId";

    public static final String TRAINING_VARIABLE = "training";

    private final RuntimeService runtimeService;
    private final ProcessInstance processInstance;

    public UnderwritingProcessInstanceWrapper(DelegateExecution delegateExecution) {
        if (delegateExecution instanceof ExecutionEntity executionEntity) {
            this.runtimeService = delegateExecution.getProcessEngine().getRuntimeService();
            this.processInstance = executionEntity.getProcessInstance();
        } else {
            throw new IllegalArgumentException("DelegateExecution is not an instance of ExecutionEntity");
        }
    }

    public UUID getApplicationId() {
        return (UUID) runtimeService.getVariable(processInstance.getProcessInstanceId(), APPLICATION_ID_VARIABLE);
    }

    public Boolean getTraining() {
        return (Boolean) runtimeService.getVariable(processInstance.getProcessInstanceId(), TRAINING_VARIABLE);
    }

    public void setTraining(Boolean training) {
        runtimeService.setVariable(processInstance.getProcessInstanceId(), TRAINING_VARIABLE, training);
    }
}
