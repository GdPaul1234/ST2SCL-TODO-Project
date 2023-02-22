import { useState } from 'react'
import { TodoControllerService, TodoResource } from '../generated'
import './todo.component.css'

export default function TodoComponent({ todo }: {
  todo: TodoResource
}) {
  const [todoState, setTodoState] = useState<TodoResource>(todo)
  const [isEditMode, setEditMode] = useState(false)

  async function setIsDone(checked: boolean) {
    if (!todoState) return

    await TodoControllerService.updateTodoStatus({ todoId: todoState.id!, requestBody: { status: checked } })
    setTodoState({ ...todoState, done: checked })
  }

  async function setDescription(description: string) {
    if (!todoState) return

    await TodoControllerService.updateTodoDescription({ todoId: todoState.id!, requestBody: { description } })
    setTodoState({ ...todoState, description })
  }

  async function deleteTodo() {
    if (!todoState) return

    await TodoControllerService.deleteTodo({ todoId: todoState.id! })
    window.location.reload()
  }

  return <div className="todo">
    <input type="checkbox" checked={todoState.done} onChange={e => setIsDone(e.target.checked)} readOnly={!isEditMode} />
    {isEditMode && <input type="text" className="description" placeholder="description" maxLength={255} value={todoState.description} onChange={e => setDescription(e.target.value)} />}
    {!isEditMode && <span className="description">{todoState.description}</span>}

    {isEditMode && <button onClick={() => setEditMode(false)}>Close</button>}
    {!isEditMode && <>
      <button onClick={() => setEditMode(true)}>Edit</button>
      <button onClick={() => deleteTodo()}>Delete</button>
    </>}
  </div>
}
