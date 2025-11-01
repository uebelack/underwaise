package cloud.underwaise.processes;

import cloud.underwaise.dto.DecisionInput;
import org.cibseven.bpm.engine.RuntimeService;
import org.cibseven.bpm.engine.delegate.DelegateExecution;
import org.cibseven.bpm.engine.impl.persistence.entity.ExecutionEntity;
import org.cibseven.bpm.engine.runtime.ProcessInstance;

import java.util.Map;
import java.util.UUID;

public class UnderwritingProcessInstanceWrapper {
    public static final String PROCESS_DEFINITION_KEY = "underwriting";
    public static final String APPLICATION_ID_VARIABLE = "applicationId";
    public static final String TRAINING_VARIABLE = "training";
    public static final String UNDERWRITING_DECISION_INPUT_VARIABLE = "underwritingDecisionInput";
    public static final String UNDERWRITING_DECISION_RESULT_VARIABLE = "underwritingDecisionResult";
    public static final String DECISION = "decision";

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

    public void setUnderwritingDecisionInput(DecisionInput decisionInput) {
        runtimeService.setVariable(processInstance.getProcessInstanceId(), UNDERWRITING_DECISION_INPUT_VARIABLE, decisionInput);
    }

    public Map<String, Object> getUnderwritingDecisionResult() {
        return (Map<String, Object>) runtimeService.getVariable(processInstance.getProcessInstanceId(), UNDERWRITING_DECISION_RESULT_VARIABLE);
    }

    public void setDecision(String decision) {
        runtimeService.setVariable(processInstance.getProcessInstanceId(), DECISION, decision);
    }
}
