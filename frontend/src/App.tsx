import { useEffect, useState } from 'react';
import './App.css';

import { ApiError, TodoControllerService, TodoResource } from './generated';
import TodoElementComponent from './components/todo.component';
import TodoAddComponent from './components/todo-add.component';
import ApiErrorBoxComponent from './components/api-error-box.component';

function App() {
  const [todos, setTodos] = useState<TodoResource[]>([])
  const [error, setError] = useState<ApiError | null>(null)

  useEffect(() => {
    async function fetchData() {
      try {
        setTodos(await TodoControllerService.getAllTodos())
      } catch (err) {
        setError(err as ApiError)
      }
    }

    fetchData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Todo List</h1>
      </header>
      <main>
        <section>
          <h2>All todos</h2>
          {error && <ApiErrorBoxComponent error={error} />}
          <ul>
            {todos.map(todo => <li key={todo.id}>
              {<TodoElementComponent todo={todo} /> || <em>Item deleted...</em>}
            </li>)}
          </ul>
        </section>
      </main>

      <section>
        <h2>Add todo</h2>
        <TodoAddComponent />
      </section>
    </div>
  );
}

export default App;
