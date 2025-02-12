package com.example.mongodb.repository;

import com.example.mongodb.entity.Note;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.List;

public interface NoteRepository extends MongoRepository<Note, String> {
    List<Note> findByProjectId(String projectId);
}