import { useEffect, useState } from 'react';
import './App.css';

import { TodoControllerService, TodoResource } from './generated';
import TodoElementComponent from './components/todo.component';
import TodoAddComponent from './components/todo-add.component';

function App() {
  const [todos, setTodos] = useState<TodoResource[]>([])

  useEffect(() => {
    async function fetchData() {
      setTodos(await TodoControllerService.getAllTodos())
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
