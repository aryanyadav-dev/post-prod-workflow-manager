package com.example.mongodb.controller;

import com.example.mongodb.entity.*;
import com.example.mongodb.service.ProjectManagementService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/project-management/{projectId}")  // Changed from /api/projects to /api/project-management
@RequiredArgsConstructor
public class ProjectManagementController {
    private final ProjectManagementService projectManagementService;

    @PostMapping("/notes")
    public ResponseEntity<Note> createNote(
            @PathVariable String projectId,
            @RequestBody Note note,
            Authentication authentication) {
        return ResponseEntity.ok(projectManagementService.createNote(
                projectId,
                note,
                authentication.getName()
        ));
    }

    @GetMapping("/notes")
    public ResponseEntity<List<Note>> getProjectNotes(@PathVariable String projectId) {
        return ResponseEntity.ok(projectManagementService.getProjectNotes(projectId));
    }

    @GetMapping("/schedule")
    public ResponseEntity<Schedule> getSchedule(@PathVariable String projectId) {
        return ResponseEntity.ok(projectManagementService.getOrCreateSchedule(projectId));
    }

    @PutMapping("/schedule")
    public ResponseEntity<Schedule> updateSchedule(
            @PathVariable String projectId,
            @RequestBody Schedule schedule) {
        return ResponseEntity.ok(projectManagementService.updateSchedule(projectId, schedule));
    }
}