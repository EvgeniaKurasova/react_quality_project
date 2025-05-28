import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setCredentials } from '../redux/authSlice'
import api from '../api/api'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'

export default function Login() {
  // Стан для email, пароля та помилки
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // Обробник форми логіну
  const handleLogin = async (e) => {
    e.preventDefault()
    setError('') // очищаємо попередню помилку
    try {
      // Відправляємо POST-запит на бекенд через api
      const response = await api.post('/login', {
        email,
        password,
      })
      console.log('LOGIN RESPONSE:', response.data)
      // Отримуємо токен (і, можливо, користувача)
      const token = response.data.data.token
      const user = response.data.data.user
      // Зберігаємо токен у Redux та localStorage
      dispatch(setCredentials({ token, user }))
      // Переходимо на сторінку адмінки
      navigate('/admin')
    } catch (err) {
      // Виводимо помилку, якщо щось пішло не так
      setError(
        'Помилка входу: ' + (err.response?.data?.message || 'Невідома помилка')
      )
    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginHeader}>
          <h1>Вхід до адмін-панелі</h1>
        </div>

        <form onSubmit={handleLogin} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@example.com"
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="admin123"
            />
          </div>

          {error && <div className={styles.errorMessage}>{error}</div>}

          <button type="submit" className={styles.submitButton}>
            Увійти
          </button>
        </form>
      </div>
    </div>
  )
}
