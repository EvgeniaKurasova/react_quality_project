import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { FaFacebook, FaInstagram } from 'react-icons/fa'
import styles from './Footer.module.css'

const Footer = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const handleChooseFriend = (e) => {
    e.preventDefault()

    if (location.pathname === '/') {
      const animalCardsSection = document.getElementById('animal-cards')
      if (animalCardsSection) {
        animalCardsSection.scrollIntoView({ behavior: 'smooth' })
      }
    } else {
      navigate('/', { state: { scrollToAnimalCards: true } })
    }
  }

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <div className={styles.footerSection}>
          <h4 className={styles.logo}>Animal Shelter</h4>
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
            <NavLink className={styles.footerItem} to="." end>
              Home
            </NavLink>
            <NavLink className={styles.footerItem} to="/about">
              Про нас
            </NavLink>
            <NavLink
              to="/"
              className={styles.footerItem}
              onClick={handleChooseFriend}
            >
              Знайти друга
            </NavLink>
          </nav>
        </div>

        <div className={styles.footerSection}>
          <h4>Контакти</h4>
          <div className={styles.contactInfo}>
            <div className={styles.footerItem}>
              Email: info@animalshelter.com!
            </div>
            <div className={styles.footerItem}>Телефон: +380 44 123 4567!</div>
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
