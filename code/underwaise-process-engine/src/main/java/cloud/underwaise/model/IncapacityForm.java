package cloud.underwaise.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "incapacity_form")
public class IncapacityForm extends BaseHealthForm {
    // No additional fields needed for now
}
