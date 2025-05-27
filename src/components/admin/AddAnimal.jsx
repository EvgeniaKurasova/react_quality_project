import { useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './AddAnimal.module.css'
import { useAddAnimalMutation } from '../../redux/animalApi'

export default function AddAnimal() {
  const [addAnimal, { isLoading, isSuccess, error }] = useAddAnimalMutation()

  const [animal, setAnimal] = useState({
    name: '',
    name_en: '',
    type: '',
    type_en: '',
    gender: '',
    age_years: '',
    age_months: '',
    size: '',
    size_en: '',
    isSterilizet: '',
    description: '',
    description_en: '',
    ag_updated_at: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setAnimal((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addAnimal(animal).unwrap()
      alert('✅ Тварину додано успішно!')
      // очищення форми, якщо потрібно:
      setAnimal({
        name: '',
        name_en: '',
        type: '',
        type_en: '',
        gender: '',
        age_years: '',
        age_months: '',
        size: '',
        size_en: '',
        isSterilizet: '',
        description: '',
        description_en: '',
        ag_updated_at: '',
      })
    } catch (err) {
      console.error('❌ Помилка при додаванні тварини:', err)
      alert('❌ Сталася помилка. Спробуйте ще раз.')
    }
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
              id="name"
              name="name"
              value={animal.name}
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
            <label>Стать/Gender*</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="sex"
                  value="Чоловіча"
                  checked={animal.sex === 'Чоловіча'}
                  onChange={handleChange}
                  required
                />
                Чоловіча
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="sex"
                  value="Жіноча"
                  checked={animal.sex === 'Жіноча'}
                  onChange={handleChange}
                  required
                />
                Жіноча
              </label>
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputGroup}>
            <label htmlFor="age_years">Кількість років*</label>
            <input
              type="number"
              id="age_years"
              name="age_years"
              value={animal.age_years}
              onChange={handleChange}
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="age_mounth">Кількість місяців*</label>
            <input
              type="number"
              id="age_mounth"
              name="age_mounth"
              value={animal.age_mounth}
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
            <label>Стерелізація</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="isSterilizet"
                  value="Так"
                  checked={animal.isSterilizet === 'Так'}
                  onChange={handleChange}
                />
                Так
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="isSterilizet"
                  value="Ні"
                  checked={animal.isSterilizet === 'Ні'}
                  onChange={handleChange}
                />
                Ні
              </label>
            </div>
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

        <button
          type="submit"
          className={styles.submitButton}
          onClick={handleSubmit}
        >
          Зберегти
        </button>
      </form>
    </div>
  )
}
