package com.victorio.taskmanager.service;

import com.victorio.taskmanager.dto.TaskRequestDto;
import com.victorio.taskmanager.dto.TaskResponseDto;
import com.victorio.taskmanager.entity.Task;
import com.victorio.taskmanager.entity.TaskStatus;
import com.victorio.taskmanager.repository.TaskRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

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

        if (taskRepository.existsByTitle(requestDto.getTitle())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task title must be unique");
        }

        task.setDescription(requestDto.getDescription());
        task.setStatus(requestDto.getStatus() != null ? requestDto.getStatus() : TaskStatus.PENDING);
        task.setDifficulty(requestDto.getDifficulty());

        Task savedTask = taskRepository.save(task);
        return mapToResponseDto(savedTask);
    }

    @Override
    public TaskResponseDto getTaskById(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Task not found with id: " + id));
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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No task found with id: " + id));

        if (requestDto.getTitle() != null && taskRepository.existsByTitleAndIdNot(requestDto.getTitle(), id)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Task title must be unique");
        }

        if (requestDto.getTitle() != null) task.setTitle(requestDto.getTitle());
        if (requestDto.getDescription() != null) task.setDescription(requestDto.getDescription());
        if (requestDto.getStatus() != null) task.setStatus(requestDto.getStatus());
        if (requestDto.getDifficulty() != null) task.setDifficulty(requestDto.getDifficulty());

        Task updatedTask = taskRepository.save(task);
        return mapToResponseDto(updatedTask);
    }

    @Override
    public void deleteTask(Long id) {
        Task task = taskRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No task found with id: " + id));
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
