package cloud.underwaise.model;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Embeddable //todo replace with 1 to 1 relation
public class ApplicationForm {
    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "birth_date", nullable = false)
    private LocalDate birthDate;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "smoker", nullable = false)
    private boolean smoker;

    @Lob
    @Column(name = "hobbies")
    private String hobbies;

    @Lob
    @Column(name = "health_conditions")
    private String healthConditions;
}