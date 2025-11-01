package cloud.underwaise.model;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import java.math.BigDecimal;
import java.util.UUID;

@Data
@Entity
@Table(name = "application_feature")
public class ApplicationFeature {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "feature_uuid", updatable = false, nullable = false, unique = true)
    private UUID featureUuid;

    @Column(name = "age", nullable = false)
    private Integer age = 0;

    @Column(name = "height_in_cm", nullable = false, precision = 5, scale = 2)
    private BigDecimal heightInCm = new BigDecimal("172.0");

    @Column(name = "weight_in_kg", nullable = false, precision = 5, scale = 2)
    private BigDecimal weightInKg = new BigDecimal("73.9");

    @Column(name = "BMI", nullable = false, precision = 5, scale = 2)
    private BigDecimal bmi = new BigDecimal("25.0");

    @Column(name = "smoker", nullable = false)
    private Boolean smoker = false;

    @Column(name = "drugs", nullable = false)
    private Boolean drugs = false;

    @Column(name = "hobby_score", nullable = false, precision = 5, scale = 2)
    private BigDecimal hobbyScore = new BigDecimal("5.0");

    @Column(name = "physical_health_score", nullable = false, precision = 5, scale = 2)
    private BigDecimal physicalHealthScore = new BigDecimal("5.0");

    @Column(name = "psychological_health_score", nullable = false, precision = 5, scale = 2)
    private BigDecimal psychologicalHealthScore = new BigDecimal("5.0");

    @Column(name = "medication_health_score", nullable = false, precision = 5, scale = 2)
    private BigDecimal medicationHealthScore = new BigDecimal("5.0");

    @Column(name = "restrictions_score", nullable = false, precision = 5, scale = 2)
    private BigDecimal restrictionsScore = new BigDecimal("5.0");
}
