package com.example.mongodb.entity;

import com.example.mongodb.enums.Priority;
import lombok.Data;

@Data
public class TaskItem {
    private String id;
    private String title;
    private String description;
    private String assignedTo;
    private Priority priority;
    private long dueDate;
}