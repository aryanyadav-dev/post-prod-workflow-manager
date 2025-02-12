package com.example.mongodb.DTO;
import com.example.mongodb.enums.Priority;
import lombok.Data;

@Data
public class TaskRequest {
    private String title;
    private String description;
    private Priority priority;
    private long completionDate;
    private String assignedTo;
}