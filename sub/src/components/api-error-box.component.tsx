import { ApiError } from "../generated";
import './api-error-box.component.css'

export default function ApiErrorBoxComponent({ error }: {
  error: ApiError
}) {
  return <div className="error-box-container">
    <h2 className="title">{error.statusText}</h2>
    <p className="description">{error.body.detail}</p>
  </div>
}
