package cloud.underwaise.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDate;
import java.util.List;
import java.util.UUID;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Entity
@Table(name = "application_form")
public class ApplicationForm {
    @Id
    @GeneratedValue(generator = "UUID")
    @GenericGenerator(
            name = "UUID",
            strategy = "org.hibernate.id.UUIDGenerator"
    )
    @Column(name = "form_uuid", updatable = false, nullable = false, unique = true)
    private UUID formUuid;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "height", nullable = false)
    private int height;

    @Column(name = "weight", nullable = false)
    private int weight;

    @Column(name = "is_smoker", nullable = false)
    private boolean isSmoker;

    @Column(name = "is_drug_user", nullable = false)
    private boolean isDrugUser;

    @Column(name = "special_sport_activities", nullable = true)
    String specialSportActivities;

    // Section for questions with complex answers v1.5 ;P
    @OneToMany(mappedBy = "applicationForm", cascade = CascadeType.ALL, orphanRemoval = true)
    List<HealthConditionForm> physicalHealthConditions;

    @OneToMany(mappedBy = "applicationForm", cascade = CascadeType.ALL, orphanRemoval = true)
    List<HealthConditionForm> mentalHealthConditions;

    @OneToMany(mappedBy = "applicationForm", cascade = CascadeType.ALL, orphanRemoval = true)
    List<MedicationForm> medicationForm;

    @OneToMany(mappedBy = "applicationForm", cascade = CascadeType.ALL, orphanRemoval = true)
    List<IncapacityForm> incapacityForm;
}