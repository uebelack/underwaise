package cloud.underwaise.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "health_condition_form")
public class HealthConditionForm extends BaseHealthForm {

    @Column(name = "treatment_facility_address")
    private String treatmentFacilityAddress; //physical and mental specific fields.

}