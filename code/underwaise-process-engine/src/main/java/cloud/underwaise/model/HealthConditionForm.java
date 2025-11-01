package cloud.underwaise.model;

import jakarta.persistence.Entity;

@Entity
public class HealthConditionForm extends BaseHealthForm {

    private String treatmentFacilityAddress; //physical and mental specific fields.

}