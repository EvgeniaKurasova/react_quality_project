import { useState } from 'react'
import styles from './AdoptionRequest.module.css'
import { useCreateAdoptionRequestMutation } from '../redux/adoptionRequestApi'
import { useSelector } from 'react-redux'

const AdoptionRequest = ({ animal_id, animal_name }) => {
  const user = useSelector((state) => state.auth.user)
  const [createAdoptionRequest, { isLoading, isSuccess, error }] =
    useCreateAdoptionRequestMutation()
  const [formData, setFormData] = useState({
    animal_id,
    animal_name,
    user_id: user?.id,
    first_name: '',
    last_name: '',
    phone: '',
    email: '',
    city: '',
    message: '',
    is_processed: false,
    is_archived: false,
    comment: '',
    is_viewed: false,
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await createAdoptionRequest(formData).unwrap()
      // Reset form after successful submission
      setFormData({
        animal_id,
        animal_name,
        user_id: user?.id,
        first_name: '',
        last_name: '',
        phone: '',
        email: '',
        city: '',
        message: '',
        is_processed: false,
        is_archived: false,
        comment: '',
        is_viewed: false,
      })
    } catch (err) {
      console.error('Failed to submit adoption request:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label className={styles.requestLabel} htmlFor="first_name">
          Ім'я
        </label>
        <input
          id="first_name"
          name="first_name"
          type="text"
          value={formData.first_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className={styles.requestLabel} htmlFor="last_name">
          Прізвище
        </label>
        <input
          id="last_name"
          name="last_name"
          type="text"
          value={formData.last_name}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className={styles.requestLabel} htmlFor="phone">
          Номер телефону
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className={styles.requestLabel} htmlFor="email">
          Електронна пошта
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label className={styles.requestLabel} htmlFor="city">
          Місто
        </label>
        <input
          id="city"
          name="city"
          type="text"
          value={formData.city}
          onChange={handleChange}
        />
      </div>
      <div>
        <label className={styles.requestLabel} htmlFor="message">
          Ваше повідомлення
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Відправляємо...' : 'Відправити заявку'}
      </button>
      {isSuccess && (
        <p className={styles.success}>Заявку успішно відправлено!</p>
      )}
      {error && (
        <p className={styles.error}>
          Помилка при відправці заявки. Будь ласка, спробуйте ще раз.
        </p>
      )}
    </form>
  )
}

export default AdoptionRequest
