package com.example.service1.application;

import lombok.NonNull;

public record UpdateTodoDescriptionCommand(
        @NonNull String todoId,
        @NonNull String description
) { }
