package com.example.mongodb.service;

import com.example.mongodb.entity.*;
import com.example.mongodb.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;

@Service
@RequiredArgsConstructor
public class ProjectBoardService {
    private final ProjectRepository projectRepository;
    private final NoteRepository noteRepository;
    private final ScheduleRepository scheduleRepository;

    public KanbanBoard getProjectBoard(String projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Project not found"));
        return project.getKanbanBoards().get(0); // Assuming we're working with the default board
    }

    public Note createNote(String projectId, Note note) {
        note.setProjectId(projectId);
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
        Schedule existingSchedule = scheduleRepository.findByProjectId(projectId)
                .orElseThrow(() -> new RuntimeException("Schedule not found"));
        schedule.setId(existingSchedule.getId());
        schedule.setProjectId(projectId);
        schedule.setUpdatedAt(System.currentTimeMillis());
        return scheduleRepository.save(schedule);
    }
}