import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './AddAnimal.module.css'

export default function AddAnimal() {
  const [animal, setAnimal] = useState({
    name: '',
    name_en: '',
    type: '',
    type_en: '',
    sex: '',
    sex_en: '',
    age: '',
    size: '',
    size_en: '',
    location: '',
    location_en: '',
    description: '',
    description_en: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setAnimal((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // TODO: Add logic to save animal
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <Link to="/admin/animals" className={styles.backButton}>
          ← Назад
        </Link>
        <h1>Додати тварину</h1>
      </div>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <div className={styles.inputGroup}>
            <label htmlFor="name_ua">Ім'я*</label>
            <input
              type="text"
              id="name_ua"
              name="name_ua"
              value={animal.name_ua}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="name_en">Name*</label>
            <input
              type="text"
              id="name_en"
              name="name_en"
              value={animal.name_en}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputGroup}>
            <label htmlFor="type">Вид*</label>
            <input
              type="text"
              id="type"
              name="type"
              value={animal.type}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="type_en">Type*</label>
            <input
              type="text"
              id="type_en"
              name="type_en"
              value={animal.type_en}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputGroup}>
            <label htmlFor="sex">Стать*</label>
            <input
              type="text"
              id="sex"
              name="sex"
              value={animal.sex}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="sex_en">Sex*</label>
            <input
              type="text"
              id="sex_en"
              name="sex_en"
              value={animal.sex_en}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputGroup}>
            <label htmlFor="age">Вік*</label>
            <input
              type="number"
              id="age"
              name="age"
              value={animal.age}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputGroup}>
            <label htmlFor="size">Розмір</label>
            <input
              type="text"
              id="size"
              name="size"
              value={animal.size}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="size_en">Size</label>
            <input
              type="text"
              id="size_en"
              name="size_en"
              value={animal.size_en}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputGroup}>
            <label htmlFor="location">Місце перебування</label>
            <input
              type="text"
              id="location"
              name="location"
              value={animal.location}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="location_en">Location</label>
            <input
              type="text"
              id="location_en"
              name="location_en"
              value={animal.location_en}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputGroup}>
            <label htmlFor="description">Опис</label>
            <textarea
              id="description"
              name="description"
              value={animal.description}
              onChange={handleChange}
              rows={4}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="description_en">Description</label>
            <textarea
              id="description_en"
              name="description_en"
              value={animal.description_en}
              onChange={handleChange}
              rows={4}
            />
          </div>
        </div>

        <button type="submit" className={styles.submitButton}>
          Зберегти
        </button>
      </form>
    </div>
  )
}
