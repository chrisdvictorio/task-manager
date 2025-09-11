package com.victorio.taskmanager.dto;

import com.victorio.taskmanager.entity.TaskStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class TaskRequestDto {
    private String title;
    private String description;
    private TaskStatus status;
}
