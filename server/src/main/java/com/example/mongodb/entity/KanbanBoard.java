package com.example.mongodb.entity;

import lombok.Data;
import java.util.List;

@Data
public class KanbanBoard {
    private String id;
    private String title;
    private String description;
    private List<TaskColumn> columns;
    private long createdAt;
}