package com.example.service1.application;

import lombok.*;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter @Setter
public class TodoResource {
    private String id;
    private String description;
    private boolean isDone;
}
