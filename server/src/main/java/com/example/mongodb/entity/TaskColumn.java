package com.example.mongodb.entity;

import lombok.Data;
import java.util.List;

@Data
public class TaskColumn {
    private String id;
    private String name;
    private List<Task> tasks;
    private int order;
}