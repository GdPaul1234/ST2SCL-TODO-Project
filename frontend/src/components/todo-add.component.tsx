import { FormEvent, useState } from 'react'
import { ApiError, TodoControllerService } from '../generated'
import ApiErrorBoxComponent from './api-error-box.component'
import './todo-add.component.css'

export default function TodoAddComponent() {
  const [description, setDescription] = useState('')
  const [error, setError] = useState<ApiError | null>(null)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    try {
      await TodoControllerService.createTodo({ requestBody: { description } })
      window.location.reload()
    } catch (err) {
      setError(err as ApiError)
    }
  }

  return <>
    {error && <ApiErrorBoxComponent error={error} />}

    <form onSubmit={e => handleSubmit(e)}>
      <label htmlFor="description">Description</label>
      <textarea id="description" maxLength={255} cols={80} rows={4} value={description} onChange={e => setDescription(e.target.value)} />
      <button type="submit">Add todo</button>
    </form>
  </>

}
