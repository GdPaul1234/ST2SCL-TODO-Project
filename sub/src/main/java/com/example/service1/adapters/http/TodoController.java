package com.example.service1.adapters.http;

import com.example.service1.application.*;
import com.example.service1.domain.Todo;
import lombok.AllArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
@RequestMapping("/v1/todos")
public class TodoController {
    TodoApplicationService todoApplicationService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TodoResource> createTodo(@RequestBody CreateTodoRequest createTodoRequest) {
        final var todo = todoApplicationService.createTodo(new CreateTodoCommand(
                createTodoRequest.description()
        ));
        return ResponseEntity.ok(toTodoResource(todo));
    }

    @GetMapping(value = "/{todoId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TodoResource> getTodo(@PathVariable("todoId") String todoId) {
        final var todo = todoApplicationService.getTodo(todoId);
        return todo
                .map(value -> ResponseEntity.ok(toTodoResource(value)))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<TodoResource>> getAllTodos() {
        final var todos = todoApplicationService.getAllTodos().stream().map(this::toTodoResource).toList();
        return ResponseEntity.ok(todos);
    }

    @PatchMapping(value = "/{todoId}/description", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TodoResource> updateTodoDescription(
            @PathVariable("todoId") String todoId,
            @RequestBody UpdateTodoDescriptionRequest updateTodoDescriptionRequest
    ) {
        final var todo = todoApplicationService.updateTodoDescription(
                new UpdateTodoDescriptionCommand(
                        todoId,
                        updateTodoDescriptionRequest.description()
                )
        );
        return ResponseEntity.ok(toTodoResource(todo));
    }

    @PatchMapping(value = "/{todoId}/status", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<TodoResource> updateTodoStatus(
            @PathVariable("todoId") String todoId,
            @RequestBody UpdateTodoStatusRequest updateTodoStatusRequest
    ) {
        final var todo = todoApplicationService.updateTodoStatus(
                new UpdateTodoStatusCommand(
                        todoId,
                        updateTodoStatusRequest.status()
                )
        );
        return ResponseEntity.ok(toTodoResource(todo));
    }

    @DeleteMapping(value = "/{todoId}")
    public ResponseEntity<Void> deleteTodo(@PathVariable("todoId") String todoId) {
        todoApplicationService.deleteTodo(todoId);
        return ResponseEntity.ok().build();
    }

    private TodoResource toTodoResource(Todo todo) {
        return TodoResource
                .builder()
                .id(todo.getId())
                .description(todo.getDescription())
                .isDone(todo.isDone())
                .build();
    }
}
