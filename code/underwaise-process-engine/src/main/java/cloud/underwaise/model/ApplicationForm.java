package cloud.underwaise.model;

import java.time.LocalDate;

public record ApplicationForm(
        String firstName,
        String lastName,
        LocalDate birthDate,
        String email,
        boolean smoker,
        String hobbies,
        String healthConditions
) {
}