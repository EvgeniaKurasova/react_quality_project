import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import { MdLanguage } from 'react-icons/md'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Animal Shelter</div>
      <div className={styles.menu}>
        <nav className={styles.nav}>
          <NavLink to="." end>
            Home
          </NavLink>
          <NavLink to="/animal_list">Catalog</NavLink>
          <NavLink to="/about">About Us</NavLink>
        </nav>
        <div>
          <MdLanguage title="language" />
        </div>
      </div>
    </header>
  )
}

export default Header
