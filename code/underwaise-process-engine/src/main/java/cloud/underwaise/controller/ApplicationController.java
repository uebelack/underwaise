package cloud.underwaise.controller;

import cloud.underwaise.model.Application;
import cloud.underwaise.model.ApplicationForm;
import cloud.underwaise.services.UnderwritingService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
