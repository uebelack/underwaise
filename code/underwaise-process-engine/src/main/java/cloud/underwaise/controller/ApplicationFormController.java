package cloud.underwaise.controller;

import cloud.underwaise.model.ApplicationForm;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/application")
@CrossOrigin(origins = "*") // Allow cross-origin requests
public class ApplicationFormController {

    @PostMapping("/submit")
    public ResponseEntity<Map<String, Object>> submitForm(@Valid @RequestBody ApplicationForm applicationForm) {
        try {
            // Log the received form data (for debugging purposes)
            System.out.println("Received application form: " + applicationForm);

            // TODO: Add your business logic here
            // For now, just return a success response with the received data

            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "Application form submitted successfully");
            response.put("submittedData", applicationForm);
            response.put("timestamp", java.time.LocalDateTime.now());

            return ResponseEntity.ok(response);

        } catch (Exception e) {
            // Handle any exceptions
            Map<String, Object> errorResponse = new HashMap<>();
            errorResponse.put("status", "error");
            errorResponse.put("message", "Failed to process application form");
            errorResponse.put("error", e.getMessage());
            errorResponse.put("timestamp", java.time.LocalDateTime.now());

            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }

    @GetMapping("/health")
    public ResponseEntity<Map<String, String>> healthCheck() {
        Map<String, String> response = new HashMap<>();
        response.put("status", "healthy");
        response.put("service", "Form Controller");
        return ResponseEntity.ok(response);
    }
}
