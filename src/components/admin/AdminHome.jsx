import { useNavigate } from 'react-router-dom'
import styles from './AdminHome.module.css'
import { useDispatch } from 'react-redux'
import { logout } from '../../redux/authSlice'

const AdminHome = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <h1>Адміністративна панель</h1>
        <div className={styles.headerAdminButtonGroup}>
        <button
          className={styles.addButton}
          onClick={() => navigate('add-animal')}
        >
          + Додати тварину
        </button>
        <button className={styles.logoutButton} onClick={handleLogout}>
          Вийти
        </button>
        </div>
      </div>
      <div className={styles.nav}>
        <button onClick={() => navigate('animals')}>Тварини</button>
        <button onClick={() => navigate('adoption-requests')}>
          Запити на усиновлення
        </button>
        <button onClick={() => navigate('users')}>
          Зареєстровані користувачі
        </button>
        <button onClick={() => navigate('shelter-info')}>
          Інформація про притулок
        </button>
      </div>
    </div>
  )
}

export default AdminHome
