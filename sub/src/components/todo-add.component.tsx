import { FormEvent, useState } from 'react'
import { TodoControllerService } from '../generated'
import './todo-add.component.css'

export default function TodoAddComponent() {
  const [description, setDescription] = useState('')

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await TodoControllerService.createTodo({ requestBody: { description } })
    window.location.reload()
  }

  return <form onSubmit={e => handleSubmit(e)}>
    <label htmlFor="description">Description</label>
    <textarea id="description" maxLength={255} cols={80} rows={4} value={description} onChange={e => setDescription(e.target.value)} />
    <button type="submit">Add todo</button>
  </form>
}
