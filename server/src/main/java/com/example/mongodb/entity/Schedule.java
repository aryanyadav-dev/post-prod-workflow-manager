package com.example.mongodb.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import java.util.List;

@Data
@Document(collection = "schedules")
public class Schedule {
    @Id
    private String id;
    private String projectId;  // Reference to the main project
    private List<TaskItem> inProgress;
    private List<TaskItem> completed;
    private List<TaskItem> overdue;
    private long createdAt;
    private long updatedAt;
}