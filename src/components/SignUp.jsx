import styles from './SignUp.module.css'

const SignUp = ({ switchTo }) => (
  <form className={styles.authForm}>
    <h2 className={styles.authTitle}>Sign Up</h2>
    <input type="text" placeholder="First Name" required />
    <input type="text" placeholder="Last Name" required />
    <input type="tel" placeholder="Phone Number" required />
    <input type="email" placeholder="Email" required />
    <input type="password" placeholder="Password" required />
    <input type="password" placeholder="Confirm Password" required />
    <button className={styles.forgotPasswordButton} type="submit">Sign Up</button>
    <p>
      Already have an account?{' '}
      <button type="button" onClick={() => switchTo('signIn')}>
        Sign In
      </button>
    </p>
  </form>
)

export default SignUp
