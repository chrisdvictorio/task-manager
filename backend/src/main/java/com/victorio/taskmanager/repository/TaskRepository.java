package com.victorio.taskmanager.repository;

import com.victorio.taskmanager.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TaskRepository extends JpaRepository<Task, Long> {
    boolean existsByTitle(String title);
//    If not using Spring Data JPA derived queries the code will be:
//    @Query("SELECT CASE WHEN COUNT(t) > 0 THEN true ELSE false END FROM Task t WHERE t.title = :title")
//    boolean titleExists(@Param("title") String title);

    boolean existsByTitleAndIdNot(String title, Long id);
}
