package com.victorio.taskmanager.dto;

import com.victorio.taskmanager.entity.TaskDifficulty;
import com.victorio.taskmanager.entity.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskResponseDto {
    private Long id;
    private String title;
    private String description;
    private TaskStatus status;
    private TaskDifficulty difficulty;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
