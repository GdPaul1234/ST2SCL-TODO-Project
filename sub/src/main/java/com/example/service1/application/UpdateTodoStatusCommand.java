package com.example.service1.application;

import lombok.NonNull;

public record UpdateTodoStatusCommand(
        @NonNull String todoId,
        boolean status
) { }
