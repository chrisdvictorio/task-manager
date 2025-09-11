package com.victorio.taskmanager.entity;

import java.time.LocalDateTime;

public class Task {
    private long id;
    private String title;
    private String description;
    private LocalDateTime createdAt = LocalDateTime.now();


}
