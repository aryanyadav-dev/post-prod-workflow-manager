package com.example.mongodb.controller;

import com.example.mongodb.DTO.*;
import com.example.mongodb.entity.*;
import com.example.mongodb.service.ProjectService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {
    private final ProjectService projectService;

    @PostMapping
    public ResponseEntity<Project> createProject(
            @RequestBody ProjectCreationRequest request,
            Authentication authentication) {
        return ResponseEntity.ok(projectService.createProject(request, authentication.getName()));
    }

    @GetMapping("/my-projects")
    public ResponseEntity<List<Project>> getUserProjects(Authentication authentication) {
        return ResponseEntity.ok(projectService.getUserProjects(authentication.getName()));
    }

    @GetMapping("/has-active-projects")
    public ResponseEntity<Boolean> hasActiveProjects(Authentication authentication) {
        return ResponseEntity.ok(projectService.hasActiveProjects(authentication.getName()));
    }
}


