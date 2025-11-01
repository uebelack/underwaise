package cloud.underwaise.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.util.UUID;

@Data
@Entity
@Table(name = "application")
public class Application {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "application_uuid", updatable = false, nullable = false, unique = true, columnDefinition = "uniqueidentifier")
    private UUID applicationUuid;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "fk_form_id", referencedColumnName = "form_uuid")
    private ApplicationForm applicationForm;
}
