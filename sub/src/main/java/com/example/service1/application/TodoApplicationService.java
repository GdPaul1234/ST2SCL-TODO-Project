package com.example.service1.application;

import com.example.service1.domain.Todo;
import com.example.service1.domain.TodoRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TodoApplicationService {
    @Autowired
    private TodoRepository todoRepository;

    @Transactional
    public Todo createTodo(CreateTodoCommand createTodoCommand) {
        return todoRepository.save(Todo.create(
                createTodoCommand.description()
        ));
    }

    public Optional<Todo> getTodo(String todoId) {
        return todoRepository.findById(todoId);
    }

    public List<Todo> getAllTodos() {
        return todoRepository.findAll();
    }

    @Transactional
    public Todo updateTodoDescription(UpdateTodoDescriptionCommand updateTodoDescriptionCommand) {
        final var todo = todoRepository.getReferenceById(updateTodoDescriptionCommand.todoId());
        todo.setDescription(updateTodoDescriptionCommand.description());
        return todoRepository.save(todo);
    }

    @Transactional
    public Todo updateTodoStatus(UpdateTodoStatusCommand updateTodoStatusCommand) {
        final var todo = todoRepository.getReferenceById(updateTodoStatusCommand.todoId());
        todo.setDone(updateTodoStatusCommand.status());
        return todoRepository.save(todo);
    }

    @Transactional
    public void deleteTodo(String todoId) {
        todoRepository.deleteById(todoId);
    }
}
