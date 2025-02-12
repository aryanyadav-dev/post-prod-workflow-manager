package com.example.mongodb.repository;

import com.example.mongodb.entity.Project;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface ProjectRepository extends MongoRepository<Project, String> {
    List<Project> findByUserId(String userId);
    boolean existsByUserIdAndActive(String userId, boolean active);
}