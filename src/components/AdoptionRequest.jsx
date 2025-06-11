import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import styles from './AdoptionRequest.module.css'
import { useCreateAdoptionRequestMutation } from '../redux/adoptionRequestApi'

const AdoptionRequest = ({ animal_id, animal_name }) => {
  const user = useSelector((state) => state.auth.user)
  const [createAdoptionRequest, { isLoading, isSuccess, error }] =
    useCreateAdoptionRequestMutation()

  const [formData, setFormData] = useState({
    animal_id: Number(animal_id),
    animal_name,
    user_id: user?.id || null,
    first_name: user?.first_name || '',
    last_name: user?.last_name || '',
    phone: user?.phone || '',
    email: user?.email || '',
    city: '',
    message: '',
    is_processed: false,
    is_archived: false,
    comment: '',
    is_viewed: false,
  })

  const [formErrors, setFormErrors] = useState({})

  // Оновлюємо форму при зміні даних користувача
  useEffect(() => {
    if (user) {
      // Якщо користувач авторизований - заповнюємо дані з профілю
      setFormData((prev) => ({
        ...prev,
        user_id: user.id,
        first_name: user.first_name || '',
        last_name: user.last_name || '',
        phone: user.phone || '',
        email: user.email || '',
      }))
    } else {
      // Якщо користувач вийшов - очищаємо форму
      setFormData({
        animal_id: Number(animal_id),
        animal_name,
        user_id: null,
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
      setFormErrors({})
    }
  }, [user, animal_id, animal_name])

  const validateForm = () => {
    const errors = {}
    const phoneRegex = /^\+?[\d\s-()]+$/
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!formData.first_name.trim()) {
      errors.first_name = "Ім'я обов'язкове"
    }
    if (!formData.last_name.trim()) {
      errors.last_name = "Прізвище обов'язкове"
    }
    if (!formData.phone.trim()) {
      errors.phone = "Номер телефону обов'язковий"
    } else if (!phoneRegex.test(formData.phone)) {
      errors.phone = 'Невірний формат номеру телефону'
    }
    if (!formData.email.trim()) {
      errors.email = "Email обов'язковий"
    } else if (!emailRegex.test(formData.email)) {
      errors.email = 'Невірний формат email'
    }

    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
    // Очищаємо помилку поля при зміні
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: '',
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!validateForm()) {
      return
    }

    try {
      // Готуємо дані для відправки
      const dataToSend = { ...formData }
      if (!user) {
        delete dataToSend.user_id
      }
      await createAdoptionRequest(dataToSend).unwrap()
      // Reset form after successful submission
      setFormData({
        animal_id,
        animal_name,
        user_id: user?.id || null,
        first_name: user?.first_name || '',
        last_name: user?.last_name || '',
        phone: user?.phone || '',
        email: user?.email || '',
        city: '',
        message: '',
        is_processed: false,
        is_archived: false,
        comment: '',
        is_viewed: false,
      })
      setFormErrors({})
    } catch (err) {
      console.error('Failed to submit adoption request:', err)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label className={styles.requestLabel} htmlFor="first_name">
          Ім'я
        </label>
        <input
          id="first_name"
          name="first_name"
          type="text"
          value={formData.first_name}
          onChange={handleChange}
          className={formErrors.first_name ? styles.inputError : ''}
          required
          disabled={!!user?.first_name} // Блокуємо поле, якщо дані є в профілі
        />
        {formErrors.first_name && (
          <span className={styles.errorText}>{formErrors.first_name}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.requestLabel} htmlFor="last_name">
          Прізвище
        </label>
        <input
          id="last_name"
          name="last_name"
          type="text"
          value={formData.last_name}
          onChange={handleChange}
          className={formErrors.last_name ? styles.inputError : ''}
          required
          disabled={!!user?.last_name}
        />
        {formErrors.last_name && (
          <span className={styles.errorText}>{formErrors.last_name}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.requestLabel} htmlFor="phone">
          Номер телефону
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={handleChange}
          className={formErrors.phone ? styles.inputError : ''}
          required
          disabled={!!user?.phone}
        />
        {formErrors.phone && (
          <span className={styles.errorText}>{formErrors.phone}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.requestLabel} htmlFor="email">
          Електронна пошта
        </label>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          className={formErrors.email ? styles.inputError : ''}
          required
          disabled={!!user?.email}
        />
        {formErrors.email && (
          <span className={styles.errorText}>{formErrors.email}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.requestLabel} htmlFor="city">
          Місто
        </label>
        <input
          id="city"
          name="city"
          type="text"
          value={formData.city}
          onChange={handleChange}
          className={formErrors.city ? styles.inputError : ''}
          required
          disabled={!!user?.city}
        />
        {formErrors.city && (
          <span className={styles.errorText}>{formErrors.city}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label className={styles.requestLabel} htmlFor="message">
          Ваше повідомлення
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={styles.textarea}
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className={styles.submitButton}
      >
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
