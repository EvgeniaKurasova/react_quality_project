import ForgotPassword from '../components/ForgotPassword.jsx'
import SignInForm from '../components/SignIn.jsx'
import SignUp from '../components/SignUp.jsx'
import styles from './About.module.css'

const About = () => {
  return (
    <div className={styles.container}>
      <SignInForm />
      <SignUp />
      <ForgotPassword />
    </div>
  )
}

export default About
