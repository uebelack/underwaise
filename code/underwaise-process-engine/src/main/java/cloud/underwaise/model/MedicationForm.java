package cloud.underwaise.model;

import jakarta.persistence.Entity;

@Entity
public class MedicationForm extends BaseHealthForm {

    private String medicationNameAndDosage; //e.g., Ibuprofen 200mg, Insulin 10 units
    private MedicationPeriodicityEnum medicationPeriodicity; //nullable  //e.g., daily, weekly, monthly

}