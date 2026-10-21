import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
})

export const fetchTasks = (params) => api.get('/tasks', { params }).then((r) => r.data)
export const createTask = (task) => api.post('/tasks', task).then((r) => r.data)
export const updateTask = (id, task) => api.put(`/tasks/${id}`, task).then((r) => r.data)
export const setCompleted = (id, completed) =>
  api.patch(`/tasks/${id}/complete`, { completed }).then((r) => r.data)
export const deleteTask = (id) => api.delete(`/tasks/${id}`).then((r) => r.data)
export const clearCompleted = () => api.delete('/tasks/completed').then((r) => r.data)

export function errorMessage(err) {
  return err.response?.data?.error || 'Could not reach the server. Please try again.'
}