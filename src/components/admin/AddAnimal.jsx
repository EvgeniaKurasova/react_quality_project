import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import styles from './AddAnimal.module.css'
import { useAddAnimalMutation } from '../../redux/animalApi'

export default function AddAnimal() {
  const [addAnimal, { isLoading, isSuccess, error }] = useAddAnimalMutation()
  const [previewPhotos, setPreviewPhotos] = useState({})
  const mainPhotoInputRef = useRef(null)
  const extraPhotoInputRef = useRef(null)

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
      const reader = new FileReader()

      reader.onloadend = () => {
        setAnimal((prev) => {
          const mainPhotoIndex = prev.photos_data.findIndex(
            (photo) => photo.is_main
          )

          if (mainPhotoIndex !== -1) {
            const newPhotos = [...prev.photos]
            const newPhotosData = [...prev.photos_data]
            newPhotos[mainPhotoIndex] = file
            setPreviewPhotos((prev) => ({
              ...prev,
              [mainPhotoIndex]: reader.result,
            }))
            return {
              ...prev,
              photos: newPhotos,
              photos_data: newPhotosData,
            }
          }

          const newIndex = prev.photos.length
          setPreviewPhotos((prev) => ({
            ...prev,
            [newIndex]: reader.result,
          }))
          return {
            ...prev,
            photos: [...prev.photos, file],
            photos_data: [...prev.photos_data, { is_main: true }],
          }
        })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAdditionalPhotosChange = (e) => {
    if (e.target.files.length > 0) {
      const files = Array.from(e.target.files)
      const newPreviews = {}

      files.forEach((file, index) => {
        const reader = new FileReader()
        reader.onloadend = () => {
          const newIndex = animal.photos.length + index
          newPreviews[newIndex] = reader.result
          setPreviewPhotos((prev) => ({
            ...prev,
            ...newPreviews,
          }))
        }
        reader.readAsDataURL(file)
      })

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

  const handleDeletePhoto = (index) => {
    setAnimal((prev) => {
      const newPhotos = [...prev.photos]
      const newPhotosData = [...prev.photos_data]
      newPhotos.splice(index, 1)
      newPhotosData.splice(index, 1)
      return {
        ...prev,
        photos: newPhotos,
        photos_data: newPhotosData,
      }
    })
    setPreviewPhotos((prev) => {
      const newPreviews = { ...prev }
      delete newPreviews[index]
      return newPreviews
    })
  }

  const renderPhotoPreview = (photo, index) => {
    const photoUrl = previewPhotos[index] || URL.createObjectURL(photo)
    return (
      <div key={index} className={styles.photoPreview}>
        <img src={photoUrl} alt="Preview" className={styles.photoImage} />
        <button
          type="button"
          className={styles.deletePhotoButton}
          onClick={() => handleDeletePhoto(index)}
        >
          ×
        </button>
      </div>
    )
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
      formData.append('gender', animal.gender === '1')

      if (animal.photos.length > 0) {
        animal.photos.forEach((photo, index) => {
          formData.append('photos[]', photo)
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
      <div className={styles.addContainer}>
        <h2 className={styles.title}>Додавання інформації про тварину</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroups}>
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

          <div className={styles.formGroups}>
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

          <div className={styles.formGroups}>
            <div className={styles.inputGroup}>
              <label>Стать/Gender*</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  {/* <input
                    type="radio"
                    name="gender"
                    value="true"
                    checked={animal.gender === 'true'}
                    onChange={(e) =>
                      setAnimal((prev) => ({ ...prev, gender: e.target.value }))
                    }
                    required
                  /> */}
                  <input
                    type="radio"
                    name="gender"
                    value="1"
                    checked={animal.gender === '1'}
                    onChange={(e) =>
                      setAnimal((prev) => ({ ...prev, gender: e.target.value }))
                    }
                    required
                  />
                  Чоловіча
                </label>
                <label className={styles.radioLabel}>
                  {/* <input
                    type="radio"
                    name="gender"
                    value="false"
                    checked={animal.gender === 'false'}
                    onChange={(e) =>
                      setAnimal((prev) => ({ ...prev, gender: e.target.value }))
                    }
                    required
                  /> */}
                  <input
                    type="radio"
                    name="gender"
                    value="0"
                    checked={animal.gender === '0'}
                    onChange={(e) =>
                      setAnimal((prev) => ({ ...prev, gender: e.target.value }))
                    }
                    required
                  />
                  Жіноча
                </label>
              </div>
            </div>
            <div className={styles.inputGroup}>
              <label>Стерелізація*</label>
              <input
                type="text"
                id="is_sterilized"
                name="is_sterilized"
                value={animal.is_sterilized}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className={styles.formGroups}>
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
              <label htmlFor="age_months">Кількість місяців*</label>
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

          <div className={styles.formGroups}>
            <div className={styles.inputGroup}>
              <label htmlFor="size">Розмір*</label>
              <input
                type="text"
                id="size"
                name="size"
                value={animal.size}
                onChange={handleChange}
                placeholder="Малелький/Середній/Великий"
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="size_en">Size*</label>
              <input
                type="text"
                id="size_en"
                name="size_en"
                value={animal.size_en}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className={styles.formGroups}>
            <div className={styles.inputGroup}>
              <label htmlFor="additional_information">
                Додаткова інформація
              </label>
              <textarea
                id="additional_information"
                name="additional_information"
                value={animal.additional_information}
                onChange={handleChange}
              />
            </div>
            <div className={styles.inputGroup}>
              <label htmlFor="additional_information_en">
                Additional information
              </label>
              <textarea
                id="additional_information_en"
                name="additional_information_en"
                value={animal.additional_information_en}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>Головне фото:</label>
            <div className={styles.photoUploadSection}>
              <input
                type="file"
                id="mainPhoto"
                name="mainPhoto"
                accept="image/*"
                onChange={handleMainPhotoChange}
                ref={mainPhotoInputRef}
                style={{ display: 'none' }}
                // accept="image/jpeg,image/png,image/jpg,image/gif
                required
              />
              <button
                type="button"
                className={styles.uploadButton}
                onClick={() => mainPhotoInputRef.current?.click()}
              >
                Завантажити головне фото
              </button>
              <div className={styles.photoPreviews}>
                {animal.photos
                  .map((photo, index) => {
                    if (animal.photos_data[index]?.is_main) {
                      return renderPhotoPreview(photo, index)
                    }
                    return null
                  })
                  .filter(Boolean)}
              </div>
            </div>
          </div>
          <div className={styles.inputGroup}>
            <label>Додаткові фото:</label>
            <div className={styles.photoUploadSection}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleAdditionalPhotosChange}
                ref={extraPhotoInputRef}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                className={styles.uploadButton}
                onClick={() => extraPhotoInputRef.current?.click()}
              >
                Додаткові фото (можна вибрати кілька)
              </button>
              <div className={styles.photoPreviews}>
                {animal.photos
                  .map((photo, index) => {
                    if (!animal.photos_data[index]?.is_main) {
                      return renderPhotoPreview(photo, index)
                    }
                    return null
                  })
                  .filter(Boolean)}
              </div>
            </div>
          </div>
          <button type="submit" className={styles.submitButton}>
            Зберегти
          </button>
        </form>
      </div>
    </div>
  )
}
