package cloud.underwaise.model;

import jakarta.persistence.*;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;
import java.util.UUID;

@Entity
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
    private ApplicationForm applicationForm;

    private LocalDate startDate;
    private LocalDate endDate; //nullable
    private String reason;
    private boolean isTreatmentCompleted;

}