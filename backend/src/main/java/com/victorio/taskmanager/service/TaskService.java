package com.victorio.taskmanager.service;

import com.victorio.taskmanager.dto.TaskRequestDto;
import com.victorio.taskmanager.dto.TaskResponseDto;

import java.util.List;

public interface TaskService {
    TaskResponseDto createTask(TaskRequestDto requestDto);
    TaskResponseDto getTaskById(Long id);
    List<TaskResponseDto> getAllTasks();
    TaskResponseDto updateTask(Long id, TaskRequestDto requestDto);
    void deleteTask(Long id);
}
