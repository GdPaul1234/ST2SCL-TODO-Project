package com.example.service1.domain;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NonNull;
import lombok.Setter;

import java.util.UUID;

@Entity
@Table(name="todo_entity")
@Getter
@Setter
public class Todo {
    @Id
    private String id;

    private String description;

    private boolean done = false;

    public static Todo create(@NonNull String description) {
        final var todo = new Todo();
        todo.id = UUID.randomUUID().toString();
        todo.description = description;
        return todo;
    }
}
