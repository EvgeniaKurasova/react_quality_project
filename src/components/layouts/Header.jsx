import styles from './Header.module.css'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>Animal Shelter</div>
      <div className={styles.menu}>
        <nav className={styles.nav}>
          <a href="/">Home</a>
          <a href="/catalog">Catalog</a>
          <a href="/about">About Us</a>
        </nav>
        <div>
          <img src="" alt="language" />
        </div>
      </div>
    </header>
  )
}

export default Header
