import { NavLink } from 'react-router-dom'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import styles from './Footer.module.css'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h3 className={styles.logo}>Animal Shelter</h3>
          <p className={styles.description}>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et
            consectetur, veniam distinctio architecto assumenda minima provident
            iusto numquam vel quaerat tempora iste, veritatis atque sint quos!
            Aliquid labore quae perferendis!
          </p>
        </div>
        <div className={styles.footerSection}>
          <h4>Навігація</h4>
          <nav className={styles.footerNav}>
            <NavLink to="." end>
              Home
            </NavLink>
            <NavLink to="/about">Про нас</NavLink>
            <NavLink to="/animal-list">Обрати друга!!!!!!!!!!!!!!!!!!</NavLink>
          </nav>
        </div>

        <div className={styles.footerSection}>
          <h4>Контакти</h4>
          <div className={styles.contactInfo}>
            <p>Email: info@animalshelter.com!</p>
            <p>Телефон: +380 44 123 4567!</p>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h4>Соціальні мережі</h4>
          <div className={styles.socialLinks}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebook />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <p>
          &copy; {new Date().getFullYear()} Animal Shelter. Всі права захищені.
        </p>
      </div>
    </footer>
  )
}

export default Footer
