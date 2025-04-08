import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import styles from './Login.module.css'

export default function Login() {
  const [login, setLogin] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const navigate = useNavigate()

  //   const handleChange = (e) => {
  //     const { name, value } = e.target
  //     setLogin((prev) => ({
  //       ...prev,
  //       [name]: value,
  //     }))
  //     setError('') // Clear error when user types
  //   }

  function handleInputLoginChange(e, name) {
    setLogin({ ...login, [name]: e.target.value })
    setError('') // Clear error when user types
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    alert(JSON.stringify(login))
    // Check credentials
    if (login.email === 'admin@example.com' && login.password === 'admin123') {
      // Store authentication state
      localStorage.setItem('isAuthenticated', 'true')
      navigate('/admin')
    } else {
      setError('Невірний email або пароль')
    }
  }

  return (
    <div className={styles.loginPage}>
      <div className={styles.loginContainer}>
        <div className={styles.loginHeader}>
          <h1>Вхід до адмін-панелі</h1>
        </div>

        <form onSubmit={handleSubmit} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={login.email}
              onChange={(e) => handleInputLoginChange(e, 'email')}
              required
            />
          </div>

          <div className={styles.inputGroup}>
            <label htmlFor="password">Пароль</label>
            <input
              type="password"
              id="password"
              value={login.password}
              onChange={(e) => handleInputLoginChange(e, 'password')}
              required
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
