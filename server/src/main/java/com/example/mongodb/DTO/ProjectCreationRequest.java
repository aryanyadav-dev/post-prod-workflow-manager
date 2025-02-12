package com.example.mongodb.DTO;

import lombok.Data;
import com.example.mongodb.entity.ProjectType;
import java.util.Set;
import com.example.mongodb.entity.TeamMember;
import java.util.List;

@Data
public class ProjectCreationRequest {
    private String name;
    private String description;
    private ProjectType projectType;
    private List<TeamMember> teamMembers;
}
