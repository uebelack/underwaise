package cloud.underwaise.repository;

import cloud.underwaise.model.Application;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    Optional<Application> findByApplicationFormEmail(String email);

    List<Application> findByApplicationFormSmoker(boolean smoker); // don't really need it

    @Query("SELECT a FROM Application a WHERE " +
            "a.applicationForm.firstName = :firstName AND " +
            "a.applicationForm.lastName = :lastName")
    List<Application> findByFullName(@Param("firstName") String firstName,
                                     @Param("lastName") String lastName);
}

