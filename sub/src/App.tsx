import { useEffect, useState } from 'react';
import './App.css';

import { TodoControllerService, TodoResource } from './generated';
import TodoElementComponent from './components/todo.component';

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
        <ul>
          {todos.map(todo => <li key={todo.id}>
            <TodoElementComponent todo={todo} />
          </li>)}
        </ul>
      </main>
    </div>
  );
}

export default App;
