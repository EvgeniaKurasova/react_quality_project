import { Link } from 'react-router-dom'
import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Animal Shelter</div>
      <div className={styles.menu}>
        <nav className={styles.nav}>
          <Link to="/">Home</Link>
          <Link to="/animal_list">Catalog</Link>
          <Link to="/about">About Us</Link>
        </nav>
        <div>
          <img alt="language" />
        </div>
      </div>
    </header>
  )
}

export default Header
