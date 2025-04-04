import Footer from './Footer'
import Header from './Header'
import styles from './Layouts.module.css'

const Layouts = () => {
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}></main>
      <Footer />
    </div>
  )
}

export default Layouts
