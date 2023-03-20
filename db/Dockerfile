FROM postgres:15.2-alpine

ENV POSTGRES_DB=todolist_db
COPY ./V1__init_todo.sql /docker-entrypoint-initdb.d/V1__init_todo.sql

EXPOSE 5432
