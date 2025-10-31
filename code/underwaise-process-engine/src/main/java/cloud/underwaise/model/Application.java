package cloud.underwaise.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "applications")
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Embedded // todo replace with @one to one connection
    private ApplicationForm applicationForm;
}
