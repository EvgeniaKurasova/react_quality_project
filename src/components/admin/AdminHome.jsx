import { useNavigate } from 'react-router-dom'
import styles from './AdminHome.module.css'

const AdminHome = () => {
  const navigate = useNavigate()

  return (
    <div className={styles.content}>
      <div className={styles.header}>
        <h1>Адміністративна панель</h1>
        <button
          className={styles.addButton}
          onClick={() => navigate('add-animal')}
        >
          + Додати тварину
        </button>
      </div>
      <div className={styles.nav}>
        <button onClick={() => navigate('animals')}>Тварини</button>
        <button onClick={() => navigate('adoption-requests')}>
          Запити на усиновлення
        </button>
      </div>
    </div>
  )
}

export default AdminHome
