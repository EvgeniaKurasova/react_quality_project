import styles from './SignIn.module.css'

const SignIn = ({ switchTo }) => (
    <form className={styles.authForm}>
      <h2 className={styles.authTitle}>Sign In</h2>
      <input type="email" placeholder="Email" required />
      <input type="password" placeholder="Password" required />
      <button className={styles.forgotPasswordButton} type="submit">Sign In</button>
      <p>Don't have an account? <button onClick={() => switchTo('signUp')}>Sign Up</button></p>
      <button className={styles.forgotPasswordClick} onClick={() => switchTo('forgot')}>Forgot Password?</button>
    </form>
  );
  export default SignIn;