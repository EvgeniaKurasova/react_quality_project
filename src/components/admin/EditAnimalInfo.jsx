import React, { useState, useRef } from 'react'
import styles from './EditAnimalInfo.module.css'

const EditAnimalInfo = ({ animal, onSave, onCancel }) => {
  const [editedAnimal, setEditedAnimal] = useState(animal)
  const [previewPhotos, setPreviewPhotos] = useState({})
  const mainPhotoInputRef = useRef(null)
  const extraPhotoInputRef = useRef(null)

  const handleChange = (field, value) => {
    setEditedAnimal((prev) => ({
      ...prev,
      [field]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(editedAnimal)
  }

  const handlePhotoUpload = (e, isMain = false) => {
    const files = e.target.files
    if (files) {
      if (isMain) {
        // Для головного фото беремо тільки перший файл
        const file = files[0]
        if (file) {
          const reader = new FileReader()
          reader.onloadend = () => {
            const photoData = {
              id: Date.now(),
              photo_path: reader.result,
              is_main: true,
            }
            handleChange('photos', [
              photoData,
              ...(editedAnimal.photos?.filter((p) => !p.is_main) || []),
            ])
            setPreviewPhotos((prev) => ({
              ...prev,
              [photoData.id]: reader.result,
            }))
          }
          reader.readAsDataURL(file)
        }
      } else {
        // Для додаткових фото обробляємо всі файли
        const newPhotos = []
        const newPreviews = {}

        Array.from(files).forEach((file) => {
          const reader = new FileReader()
          reader.onloadend = () => {
            const photoData = {
              id: Date.now() + Math.random(),
              photo_path: reader.result,
              is_main: false,
            }
            newPhotos.push(photoData)
            newPreviews[photoData.id] = reader.result

            // Якщо це останній файл, оновлюємо стан
            if (newPhotos.length === files.length) {
              // Зберігаємо всі попередні фото
              const existingPhotos = editedAnimal.photos || []
              const mainPhoto = existingPhotos.find((p) => p.is_main)
              const existingExtraPhotos = existingPhotos.filter(
                (p) => !p.is_main
              )

              handleChange('photos', [
                ...(mainPhoto ? [mainPhoto] : []),
                ...existingExtraPhotos,
                ...newPhotos,
              ])

              setPreviewPhotos((prev) => ({
                ...prev,
                ...newPreviews,
              }))
            }
          }
          reader.readAsDataURL(file)
        })
      }
    }
  }

  const handleDeletePhoto = (photoId) => {
    const updatedPhotos =
      editedAnimal.photos?.filter((p) => p.id !== photoId) || []
    handleChange('photos', updatedPhotos)
    setPreviewPhotos((prev) => {
      const newPreview = { ...prev }
      delete newPreview[photoId]
      return newPreview
    })
  }

  const renderPhotoPreview = (photo) => {
    const photoUrl = previewPhotos[photo.id] || photo.photo_path
    return (
      <div key={photo.id} className={styles.photoPreview}>
        <img src={photoUrl} alt="Preview" className={styles.photoImage} />
        <button
          type="button"
          className={styles.deletePhotoButton}
          onClick={() => handleDeletePhoto(photo.id)}
        >
          ×
        </button>
      </div>
    )
  }

  return (
    <div className={styles.editContainer}>
      <h2 className={styles.title}>Редагування інформації про тварину</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formFields}>
          <div className={styles.formGroups}>
            <div className={styles.formGroup}>
              <label>Ім'я:</label>
              <input
                type="text"
                value={editedAnimal.name || ''}
                onChange={(e) => handleChange('name', e.target.value)}
                placeholder="Введіть ім'я українською"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Name:</label>
              <input
                type="text"
                value={editedAnimal.name_en || ''}
                onChange={(e) => handleChange('name_en', e.target.value)}
                placeholder="Enter name in English"
              />
            </div>
          </div>
          <div className={styles.formGroups}>
            <div className={styles.formGroup}>
              <label>Вид:</label>
              <input
                type="text"
                value={editedAnimal.type || ''}
                onChange={(e) => handleChange('type', e.target.value)}
                placeholder="Введіть вид українською"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Kind:</label>
              <input
                type="text"
                value={editedAnimal.type_en || ''}
                onChange={(e) => handleChange('type_en', e.target.value)}
                placeholder="Enter type in English"
              />
            </div>
          </div>
          <div className={styles.formGroups}>
            <div className={styles.formGroup}>
              <label>Стать:</label>
              <div className={styles.radioGroup}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="gender"
                    value="Чоловіча"
                    checked={editedAnimal.gender === 'Чоловіча'}
                    onChange={(e) => handleChange('gender', e.target.value)}
                  />
                  <span>Хлопчик</span>
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="gender"
                    value="Жіноча"
                    checked={editedAnimal.gender === 'Жіноча'}
                    onChange={(e) => handleChange('gender', e.target.value)}
                  />
                  <span>Дівчинка</span>
                </label>
              </div>
            </div>
            <div className={styles.formGroup}>
              <label>Стерилізація:</label>
              <input
                type="text"
                value={editedAnimal.isSterilizet || ''}
                onChange={(e) => handleChange('isSterilizet', e.target.value)}
                placeholder="Введіть статус стерилізації"
              />
            </div>
          </div>
          <div className={styles.formGroups}>
            <div className={styles.formGroup}>
              <label>Кількість років:</label>
              <input
                type="number"
                value={editedAnimal.age_years || ''}
                onChange={(e) => handleChange('age_years', e.target.value)}
                placeholder="Введіть кількість років"
              />
            </div>
            <div className={styles.formGroup}>
              <label>Кількість місяців:</label>
              <input
                type="number"
                value={editedAnimal.age_months || ''}
                onChange={(e) => handleChange('age_months', e.target.value)}
                placeholder="Введіть кількість місяців"
              />
            </div>
          </div>
          <div className={styles.formGroups}>
            <div className={styles.formGroup}>
              <label>Розмір:</label>
              <input
                type="text"
                value={editedAnimal.size || ''}
                onChange={(e) => handleChange('size', e.target.value)}
                placeholder="Введіть розмір українською"
              />
            </div>

            <div className={styles.formGroup}>
              <label>Size:</label>
              <input
                type="text"
                value={editedAnimal.size_en || ''}
                onChange={(e) => handleChange('size_en', e.target.value)}
                placeholder="Enter size in English"
              />
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Додаткова інформація:</label>
            <textarea
              value={editedAnimal.additional_information || ''}
              onChange={(e) =>
                handleChange('additional_information', e.target.value)
              }
              placeholder="Введіть додаткову інформацію українською"
              rows="4"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Additional info:</label>
            <textarea
              value={editedAnimal.additional_information_en || ''}
              onChange={(e) =>
                handleChange('additional_information_en', e.target.value)
              }
              placeholder="Enter additional information in English"
            />
          </div>

          <div className={styles.formGroup}>
            <label>Головне фото:</label>
            <div className={styles.photoUploadSection}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handlePhotoUpload(e, true)}
                ref={mainPhotoInputRef}
                style={{ display: 'none' }}
              />
              <button
                type="button"
                className={styles.uploadButton}
                onClick={() => mainPhotoInputRef.current?.click()}
              >
                Завантажити головне фото
              </button>
              <div className={styles.photoPreviews}>
                {editedAnimal.photos
                  ?.filter((p) => p.is_main)
                  .map(renderPhotoPreview)}
              </div>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label>Додаткові фото:</label>
            <div className={styles.photoUploadSection}>
              <input
                type="file"
                accept="image/*"
                multiple
                onChange={(e) => handlePhotoUpload(e, false)}
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
                {editedAnimal.photos
                  ?.filter((p) => !p.is_main)
                  .map(renderPhotoPreview)}
              </div>
            </div>
          </div>
        </div>

        <div className={styles.buttonGroup}>
          <button
            type="button"
            className={styles.cancelButton}
            onClick={onCancel}
          >
            Скасувати
          </button>
          <button type="submit" className={styles.saveButton}>
            Зберегти
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditAnimalInfo
