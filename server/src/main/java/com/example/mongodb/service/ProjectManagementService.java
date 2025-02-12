package com.example.mongodb.service;

import com.example.mongodb.entity.*;
import com.example.mongodb.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ProjectManagementService {
    private final ProjectRepository projectRepository;
    private final NoteRepository noteRepository;
    private final ScheduleRepository scheduleRepository;

    public Note createNote(String projectId, Note note, String username) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));

        note.setProjectId(projectId);
        note.setCreatedBy(username);
        note.setCreatedAt(System.currentTimeMillis());
        note.setUpdatedAt(System.currentTimeMillis());

        return noteRepository.save(note);
    }

    public List<Note> getProjectNotes(String projectId) {
        return noteRepository.findByProjectId(projectId);
    }

    public Schedule getOrCreateSchedule(String projectId) {
        return scheduleRepository.findByProjectId(projectId)
                .orElseGet(() -> {
                    Schedule schedule = new Schedule();
                    schedule.setProjectId(projectId);
                    schedule.setInProgress(new ArrayList<>());
                    schedule.setCompleted(new ArrayList<>());
                    schedule.setOverdue(new ArrayList<>());
                    schedule.setCreatedAt(System.currentTimeMillis());
                    schedule.setUpdatedAt(System.currentTimeMillis());
                    return scheduleRepository.save(schedule);
                });
    }

    public Schedule updateSchedule(String projectId, Schedule schedule) {
        // First try to find existing schedule
        Schedule existingSchedule = scheduleRepository.findByProjectId(projectId)
                .orElseGet(() -> {
                    // If not found, create new schedule
                    Schedule newSchedule = new Schedule();
                    newSchedule.setProjectId(projectId);
                    newSchedule.setInProgress(new ArrayList<>());
                    newSchedule.setCompleted(new ArrayList<>());
                    newSchedule.setOverdue(new ArrayList<>());
                    newSchedule.setCreatedAt(System.currentTimeMillis());
                    return newSchedule;
                });

        // Update the existing schedule with new data
        schedule.setId(existingSchedule.getId());
        schedule.setProjectId(projectId);
        schedule.setCreatedAt(existingSchedule.getCreatedAt());
        schedule.setUpdatedAt(System.currentTimeMillis());

        return scheduleRepository.save(schedule);
    }
}