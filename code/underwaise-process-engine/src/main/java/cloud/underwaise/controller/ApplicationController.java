package cloud.underwaise.controller;

import cloud.underwaise.model.Application;
import cloud.underwaise.model.ApplicationForm;
import cloud.underwaise.services.UnderwritingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController //Only for testing db access
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final UnderwritingService underwritingService;

    @PostMapping
    @Operation(summary = "Submit a new application",
            description = "Creates a new application and starts the underwriting process")
    @ApiResponse(responseCode = "200", description = "Application successfully submitted")
    public ResponseEntity<Application> submitApplication(@RequestBody ApplicationForm applicationForm) {
        Application application = underwritingService.start(applicationForm);
        return ResponseEntity.ok(application);
    }

    @GetMapping("/{id}")
    @Operation(summary = "Get application by ID")
    @ApiResponse(responseCode = "200", description = "Application found")
    @ApiResponse(responseCode = "404", description = "Application not found")
    public ResponseEntity<Application> getApplication(@PathVariable Long id) {
        try {
            Application application = underwritingService.findById(id);
            return ResponseEntity.ok(application);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/by-email/{email}")
    @Operation(summary = "Get application by email")
    @ApiResponse(responseCode = "200", description = "Application found")
    @ApiResponse(responseCode = "404", description = "Application not found")
    public ResponseEntity<Application> getApplicationByEmail(@PathVariable String email) {
        try {
            Application application = underwritingService.findByEmail(email);
            return ResponseEntity.ok(application);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
