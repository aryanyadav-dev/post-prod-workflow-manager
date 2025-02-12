package com.example.mongodb.entity;

import com.example.mongodb.enums.Priority;
import com.example.mongodb.enums.TaskStatus;
import lombok.Data;

@Data
public class Task {
    private String id;
    private String title;
    private String description;
    private Priority priority;
    private long completionDate;
    private String assignedTo;
    private TaskStatus status;
    private long createdAt;
    private long updatedAt;
}