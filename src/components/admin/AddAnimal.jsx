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
    is_sterilized: '',
    additional_information: '',
    additional_information_en: '',
    age_updated_at: '',
    photos: [],
    photos_data: [],
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setAnimal((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleMainPhotoChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0]
      setAnimal((prev) => {
        const mainPhotoIndex = prev.photos_data.findIndex(
          (photo) => photo.is_main
        )

        if (mainPhotoIndex !== -1) {
          const newPhotos = [...prev.photos]
          const newPhotosData = [...prev.photos_data]
          newPhotos[mainPhotoIndex] = file
          return {
            ...prev,
            photos: newPhotos,
            photos_data: newPhotosData,
          }
        }

        return {
          ...prev,
          photos: [...prev.photos, file],
          photos_data: [...prev.photos_data, { is_main: true }],
        }
      })
    }
  }

  const handleAdditionalPhotosChange = (e) => {
    if (e.target.files.length > 0) {
      const files = Array.from(e.target.files)
      setAnimal((prev) => ({
        ...prev,
        photos: [...prev.photos, ...files],
        photos_data: [
          ...prev.photos_data,
          ...files.map(() => ({ is_main: false })),
        ],
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      if (animal.photos.length !== animal.photos_data.length) {
        alert('Кількість фото і описів фото не співпадає!')
        return
      }

      const oversize = animal.photos.some(
        (photo) => photo.size > 2 * 1024 * 1024
      )
      if (oversize) {
        alert('Розмір кожного фото не повинен перевищувати 2MB!')
        return
      }

      const formData = new FormData()

      Object.keys(animal).forEach((key) => {
        if (key !== 'photos' && key !== 'photos_data' && key !== 'gender') {
          formData.append(key, animal[key])
        }
      })

      formData.append('gender', animal.gender === 'true')

      if (animal.photos.length > 0) {
        animal.photos.forEach((photo, index) => {
          formData.append('photos', photo)
          formData.append(
            `photos_data[${index}][is_main]`,
            animal.photos_data[index].is_main
          )
        })
      }

      await addAnimal(formData).unwrap()
      alert('✅ Тварину додано успішно!')
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
        is_sterilized: '',
        additional_information: '',
        additional_information_en: '',
        age_updated_at: '',
        photos: [],
        photos_data: [],
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
            <label htmlFor="name">Ім'я*</label>
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
              required
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
                  name="gender"
                  value="true"
                  checked={animal.gender === 'true'}
                  onChange={(e) =>
                    setAnimal((prev) => ({ ...prev, gender: e.target.value }))
                  }
                  required
                />
                Чоловіча
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="gender"
                  value="false"
                  checked={animal.gender === 'false'}
                  onChange={(e) =>
                    setAnimal((prev) => ({ ...prev, gender: e.target.value }))
                  }
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
              min="0"
              required
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="age_mounth">Кількість місяців*</label>
            <input
              type="number"
              id="age_months"
              name="age_months"
              value={animal.age_months}
              onChange={handleChange}
              min="0"
              max="11"
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
                  name="is_sterilized"
                  value="Так"
                  checked={animal.is_sterilized === 'Так'}
                  onChange={handleChange}
                />
                Так
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="is_sterilized"
                  value="Ні"
                  checked={animal.is_sterilized === 'Ні'}
                  onChange={handleChange}
                />
                Ні
              </label>
            </div>
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputGroup}>
            <label htmlFor="additional_information">Додаткова інформація</label>
            <textarea
              id="additional_information"
              name="additional_information"
              value={animal.additional_information}
              onChange={handleChange}
            />
          </div>
          <div className={styles.inputGroup}>
            <label htmlFor="additional_information_en">
              Додаткова інформація
            </label>
            <textarea
              id="additional_information_en"
              name="additional_information_en"
              value={animal.additional_information_en}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputGroup}>
            <label htmlFor="mainPhoto">Головне фото (фото профілю)*</label>
            <input
              type="file"
              id="mainPhoto"
              name="mainPhoto"
              accept="image/jpeg,image/png,image/jpg,image/gif"
              onChange={handleMainPhotoChange}
              required
            />
          </div>
        </div>

        <div className={styles.formGroup}>
          <div className={styles.inputGroup}>
            <label htmlFor="additionalPhotos">Додаткові фото</label>
            <input
              type="file"
              id="additionalPhotos"
              name="additionalPhotos"
              multiple
              accept="image/jpeg,image/png,image/jpg,image/gif"
              onChange={handleAdditionalPhotosChange}
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
