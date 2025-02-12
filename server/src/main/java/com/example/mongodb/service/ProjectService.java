package com.example.mongodb.service;

import com.example.mongodb.entity.*;
import com.example.mongodb.repository.ProjectRepository;
import com.example.mongodb.DTO.*;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.*;
import java.util.stream.Collectors;
import com.example.mongodb.config.MetadataConfig;

@Service
@RequiredArgsConstructor
public class ProjectService {
    private final ProjectRepository projectRepository;

    public Project createProject(ProjectCreationRequest request, String userId) {
        Project project = new Project();
        project.setName(request.getName());
        project.setDescription(request.getDescription());
        project.setUserId(userId);
        project.setProjectType(request.getProjectType());

        // Set team members
        project.setTeamMembers(request.getTeamMembers());

        // Set metadata config based on project type
        project.setMetadataConfig(createMetadataConfig(request.getProjectType()));
        project.setKanbanBoards(Collections.singletonList(createDefaultKanbanBoard()));
        project.setActive(true);
        project.setCreatedAt(System.currentTimeMillis());
        project.setUpdatedAt(System.currentTimeMillis());

        return projectRepository.save(project);
    }
    private MetadataConfig createMetadataConfig(ProjectType projectType) {
        MetadataConfig config = new MetadataConfig();
        if (projectType == ProjectType.FULL_LENGTH_VIDEO) {
            config.setAllowedCodecs(Collections.singletonList("H.265"));
            config.setAllowedResolutions(Collections.singletonList("3840x2160"));
        } else {
            config.setAllowedCodecs(Collections.singletonList("H.264"));
            config.setAllowedResolutions(Arrays.asList("3840x2160", "1080x1920"));
        }
        config.setAllowedAudioChannels(Arrays.asList(2, 6));
        return config;
    }

    private KanbanBoard createDefaultKanbanBoard() {
        KanbanBoard board = new KanbanBoard();
        board.setId(UUID.randomUUID().toString());
        board.setTitle("Default Board");
        board.setColumns(Arrays.asList(
                createTaskColumn("TO_DO", "To Do", 0),
                createTaskColumn("IN_PROGRESS", "In Progress", 1),
                createTaskColumn("COMPLETED", "Completed", 2)
        ));
        board.setCreatedAt(System.currentTimeMillis());
        return board;
    }

    private TaskColumn createTaskColumn(String id, String name, int order) {
        TaskColumn column = new TaskColumn();
        column.setId(id);
        column.setName(name);
        column.setTasks(new ArrayList<>());
        column.setOrder(order);
        return column;
    }

    public List<Project> getUserProjects(String userId) {
        return projectRepository.findByUserId(userId);
    }

    public boolean hasActiveProjects(String userId) {
        return projectRepository.existsByUserIdAndActive(userId, true);
    }
}