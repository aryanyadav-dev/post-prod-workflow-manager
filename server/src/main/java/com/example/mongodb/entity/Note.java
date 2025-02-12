package com.example.mongodb.entity;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "notes")
public class Note {
    @Id
    private String id;
    private String projectId;  // Reference to the main project
    private String title;
    private String content;
    private String createdBy;  // Username of the creator
    private long createdAt;
    private long updatedAt;
}
