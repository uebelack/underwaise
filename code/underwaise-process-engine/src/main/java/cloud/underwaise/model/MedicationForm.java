package cloud.underwaise.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "medication_form")
public class MedicationForm extends BaseHealthForm {

    @Column(name = "medication_name_and_dosage")
    private String medicationNameAndDosage; //e.g., Ibuprofen 200mg, Insulin 10 units

    @Enumerated(EnumType.STRING)
    @Column(name = "medication_periodicity")
    private MedicationPeriodicityEnum medicationPeriodicity; //nullable  //e.g., daily, weekly, monthly

}