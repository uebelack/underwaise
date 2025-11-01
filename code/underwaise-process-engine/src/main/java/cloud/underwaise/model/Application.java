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
    @Column(name = "application_uuid", updatable = false, nullable = false, unique = true)
    private UUID applicationUuid;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "fk_form_id", referencedColumnName = "form_uuid")
    private ApplicationForm applicationForm;

    @OneToOne(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinColumn(name = "fk_feature_id", referencedColumnName = "feature_uuid")
    private ApplicationFeature applicationFeature;

    @Column(name = "status")
    private String status;

    @Column(name = "statusML")
    private String statusML;

    @Column(name = "reason")
    private String reason;
}
