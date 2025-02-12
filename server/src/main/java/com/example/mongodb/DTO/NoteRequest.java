package com.example.mongodb.DTO;
import lombok.Data;

@Data
public class NoteRequest {
    private String title;
    private String content;
}