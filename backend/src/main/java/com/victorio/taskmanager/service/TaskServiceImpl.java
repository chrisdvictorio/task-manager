package com.victorio.taskmanager.service;

import com.victorio.taskmanager.dto.TaskRequestDto;
import com.victorio.taskmanager.dto.TaskResponseDto;
import com.victorio.taskmanager.entity.Task;
import com.victorio.taskmanager.entity.TaskStatus;
import com.victorio.taskmanager.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class TaskServiceImpl implements TaskService {

    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public TaskResponseDto createTask(TaskRequestDto requestDto) {
        Task task = new Task();
        task.setTitle(requestDto.getTitle());
        task.setDescription(requestDto.getDescription());

        if (requestDto.getStatus() != null) {
            task.setStatus(requestDto.getStatus());
        } else {
            task.setStatus(TaskStatus.PENDING);
        }

        task.setDifficulty(requestDto.getDifficulty());

        Task savedTask = taskRepository.save(task);
        return mapToResponseDto(savedTask);
    }

    @Override
    public TaskResponseDto getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        return mapToResponseDto(task);
    }

    @Override
    public List<TaskResponseDto> getAllTasks() {
        return taskRepository.findAll().stream()
                .map(task -> mapToResponseDto(task))
                .collect(Collectors.toList());
    }

    @Override
    public TaskResponseDto updateTask(Long id, TaskRequestDto requestDto) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No task found with id: " + id));

        task.setTitle(requestDto.getTitle());
        task.setDescription(requestDto.getDescription());

        Task updatedTask = taskRepository.save(task);
        return mapToResponseDto(updatedTask);
    }

    @Override
    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("No task found with id: " + id));
        taskRepository.delete(task);
    }

    private TaskResponseDto mapToResponseDto(Task task) {
        TaskResponseDto dto = new TaskResponseDto();
        dto.setId(task.getId());
        dto.setTitle(task.getTitle());
        dto.setDescription(task.getDescription());
        dto.setStatus(task.getStatus());
        dto.setDifficulty(task.getDifficulty());
        dto.setCreatedAt(task.getCreatedAt());
        dto.setUpdatedAt(task.getUpdatedAt());
        return dto;
    }
}
