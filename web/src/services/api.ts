import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:3972',
})

export default api;