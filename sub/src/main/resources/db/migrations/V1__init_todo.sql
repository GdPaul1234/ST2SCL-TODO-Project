CREATE TABLE public.todo_entity
(
    id          VARCHAR(255) NOT NULL,
    description VARCHAR(255) NOT NULL,
    done        BOOLEAN      NOT NULL,
    PRIMARY KEY id
);