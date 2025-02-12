package com.example.mongodb.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;
import java.util.Set;
import com.example.mongodb.config.MetadataConfig;

@Data
@Document("project")
public class Project {
    @Id
    private String id;
    private String name;
    private String description;
    private String userId;  // Owner of the project
    private ProjectType projectType;
    private List<TeamMember> teamMembers;
    private MetadataConfig metadataConfig;
    private List<KanbanBoard> kanbanBoards;
    private boolean active;
    private long createdAt;
    private long updatedAt;
}