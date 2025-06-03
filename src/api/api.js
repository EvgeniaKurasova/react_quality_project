// import axios from 'axios'

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000/api',
//   withCredentials: true // ось
// })

// api.interceptors.request.use((config) => {
//   config.headers['Accept'] = 'application/json'
//   // config.headers['Content-Type'] = 'application/json'
//   const token = localStorage.getItem('token')
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

// export default api
// import axios from 'axios'

// const api = axios.create({
//   baseURL: 'http://127.0.0.1:8000',
//   withCredentials: true,
// })

// api.interceptors.request.use((config) => {
//   const token = localStorage.getItem('token')
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`
//   }
//   return config
// })

// export default api
import axios from 'axios'

const api = axios.create({
  baseURL: 'http://127.0.0.1:8000/api', // ⬅️ змінити на `/api`, бо всі запити йдуть туди
  withCredentials: false, // ❌ не потрібен при Bearer Token логіні
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  config.headers.Accept = 'application/json'
  return config
})

export default api


