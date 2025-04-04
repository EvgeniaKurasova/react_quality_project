import { Outlet } from 'react-router-dom'
import Footer from './Footer'
import Header from './Header'
import styles from './Layouts.module.css'

const Layouts = () => {
  console.log('Layouts rendered')
  return (
    <div className={styles.container}>
      <Header />
      <main className={styles.main}>
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default Layouts
