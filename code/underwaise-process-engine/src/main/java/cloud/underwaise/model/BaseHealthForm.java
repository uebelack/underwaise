package cloud.underwaise.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.time.LocalDate;
import java.util.UUID;

@Data
@Entity
@Inheritance(strategy = InheritanceType.TABLE_PER_CLASS)
public abstract class BaseHealthForm {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "uuid", updatable = false, nullable = false, unique = true)
    private UUID uuid;

    @ManyToOne
    @JoinColumn(name = "fk_application_form", nullable = false)
    @JsonIgnore
    private ApplicationForm applicationForm;

    @Column(name = "start_date")
    private LocalDate startDate;

    @Column(name = "end_date")
    private LocalDate endDate; //nullable

    @Column(name = "reason")
    private String reason;

    @Column(name = "is_treatment_completed")
    private boolean isTreatmentCompleted;

}