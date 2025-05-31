import styles from './ForgotPassword.module.css'

const ForgotPassword = ({ switchTo }) => (
    <form className={styles.authForm}>
      <h2 className={styles.authTitle}>Forgot Password</h2>
      <input type="email" placeholder="Enter your email" required />
      <button className={styles.forgotPasswordButton} type="submit">Reset Password</button>
  
      <p className={styles.subText}>
        Back to{' '}
        <button type="button" onClick={() => switchTo('signIn')}>Sign In</button>
      </p>
    </form>
  );
  
  export default ForgotPassword;
  