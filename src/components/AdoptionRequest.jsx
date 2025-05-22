import styles from './AdoptionRequest.module.css'

const AdoptionRequest = () => {
  return (
    <form>
      <div>
        <label className={styles.requestLabel} htmlFor="first Name">
          FirstName
        </label>
        <input
          id="firstName"
          name="firstName"
          type="text"
          onChange={() => {}}
          required
        />
      </div>
      <div>
        <label className={styles.requestLabel} htmlFor="lastName">
          Last Name
        </label>
        <input
          id="lastName"
          name="lastName"
          type="text"
          onChange={() => {}}
          required
        />
      </div>
      <div>
        <label className={styles.requestLabel} htmlFor="city">
          City
        </label>
        <input id="city" name="city" type="text" onChange={() => {}} />
      </div>
      <div>
        <label className={styles.requestLabel} htmlFor="phone">
          Phone Number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          onChange={() => {}}
          required
        />
      </div>
      <div>
        <label className={styles.requestLabel} htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          onChange={() => {}}
          required
        />
      </div>
      <div>
        <label className={styles.requestLabel} htmlFor="message">
          Your Message
        </label>
        <textarea
          type="submit"
          id="message"
          name="message"
          value=""
          onChange={() => {}}
        ></textarea>
      </div>
      <button>Send request</button>
    </form>
  )
}

export default AdoptionRequest
