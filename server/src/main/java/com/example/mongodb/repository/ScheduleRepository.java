package com.example.mongodb.repository;

import com.example.mongodb.entity.Schedule;
import org.springframework.data.mongodb.repository.MongoRepository;
import java.util.Optional;

public interface ScheduleRepository extends MongoRepository<Schedule, String> {
    Optional<Schedule> findByProjectId(String projectId);
}