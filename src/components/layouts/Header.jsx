import { NavLink } from 'react-router-dom'
import styles from './Header.module.css'
import { GrLanguage } from "react-icons/gr";

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Animal Shelter</div>
      <div className={styles.menu}>
        <nav className={styles.nav}>
          <NavLink to="." end>
            Home
          </NavLink>
          <NavLink to="about">About Us</NavLink>
        </nav>
        <button className={`${styles.headerButton} ${styles.signIn}`}>
          Sign In
        </button>
        <button className={`${styles.headerButton} ${styles.signUp}`}>
          Sign Up
        </button>
        <button className={styles.languageButton}>EN</button>
        {/* <GrLanguage title="language" className={styles.languageIcon} /> */}
      </div>
    </header>
  )
}

export default Header
