import React, { useState } from 'react'
import styles from './ShelterInfoEditor.module.css'
import {
  useUpdateShelterInfoMutation,
  useAddAdoptionRulesMutation,
  useUpdateAdoptionRulesMutation,
  useUploadImageMutation,
} from '../../redux/shelterApi'

const ShelterInfoEditor = ({ shelter, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: shelter.name || '',
    name_en: shelter.name_en || '',
    phone: shelter.phone || '',
    email: shelter.email || '',
    facebook: shelter.facebook || '',
    instagram: shelter.instagram || '',
    description: shelter.description || '',
    description_en: shelter.description_en || '',
    adoption_rules: shelter.adoption_rules || '',
    adoption_rules_en: shelter.adoption_rules_en || '',
  })

  const [logoPreview, setLogoPreview] = useState(shelter.logo || '')
  const [mainPhotoPreview, setMainPhotoPreview] = useState(
    shelter.main_photo || ''
  )
  const [errors, setErrors] = useState({})

  const [updateShelterInfo] = useUpdateShelterInfoMutation()
  const [addAdoptionRules] = useAddAdoptionRulesMutation()
  const [updateAdoptionRules] = useUpdateAdoptionRulesMutation()
  const [uploadImage] = useUploadImageMutation()

  const validateUrl = (url) => {
    if (!url) return true
    try {
      new URL(url)
      return true
    } catch {
      return false
    }
  }

  const validateEmail = (email) => {
    if (!email) return true
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const validatePhone = (phone) => {
    if (!phone) return true
    const re = /^\+?[\d\s-()]+$/
    return re.test(phone)
  }

  const validateImageFile = (file) => {
    if (!file) return true
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']
    const maxSize = 5 * 1024 * 1024 // 5MB

    if (!allowedTypes.includes(file.type)) {
      return 'Дозволені формати: JPEG, PNG, GIF, WebP'
    }

    if (file.size > maxSize) {
      return 'Максимальний розмір файлу: 5MB'
    }

    return true
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))

    // Валідація при зміні
    let error = null
    if (name === 'email') {
      error = validateEmail(value) ? null : 'Невірний формат email'
    } else if (name === 'phone') {
      error = validatePhone(value) ? null : 'Невірний формат телефону'
    } else if (name.includes('facebook') || name.includes('instagram')) {
      error = validateUrl(value) ? null : 'Невірний формат URL'
    }

    setErrors((prev) => ({
      ...prev,
      [name]: error,
    }))
  }

  const handleImageChange = async (e, type) => {
    const file = e.target.files[0]
    if (!file) return

    const validationResult = validateImageFile(file)
    if (validationResult !== true) {
      setErrors((prev) => ({
        ...prev,
        [type]: validationResult,
      }))
      return
    }

    const formData = new FormData()
    formData.append('image', file)

    try {
      const result = await uploadImage(formData).unwrap()
      const imageUrl = result.url

      if (type === 'logo') {
        setLogoPreview(imageUrl)
        setFormData((prev) => ({ ...prev, logo: imageUrl }))
      } else {
        setMainPhotoPreview(imageUrl)
        setFormData((prev) => ({ ...prev, main_photo: imageUrl }))
      }

      setErrors((prev) => ({
        ...prev,
        [type]: null,
      }))
    } catch (error) {
      setErrors((prev) => ({
        ...prev,
        [type]: 'Помилка завантаження зображення',
      }))
    }
  }

  const handleRemoveImage = (type) => {
    if (type === 'logo') {
      setLogoPreview('')
      setFormData((prev) => ({ ...prev, logo: '' }))
    } else {
      setMainPhotoPreview('')
      setFormData((prev) => ({ ...prev, main_photo: '' }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Перевірка всіх полів перед відправкою
    const newErrors = {}
    if (!validateEmail(formData.email)) {
      newErrors.email = 'Невірний формат email'
    }
    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Невірний формат телефону'
    }
    if (!validateUrl(formData.facebook)) {
      newErrors.facebook = 'Невірний формат URL'
    }
    if (!validateUrl(formData.instagram)) {
      newErrors.instagram = 'Невірний формат URL'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    try {
      // Оновлення основної інформації
      await updateShelterInfo({
        ...formData,
        id: shelter.id,
      }).unwrap()

      // Якщо є правила, оновлюємо їх
      if (formData.adoption_rules || formData.adoption_rules_en) {
        if (shelter.adoption_rules || shelter.adoption_rules_en) {
          await updateAdoptionRules({
            adoption_rules: formData.adoption_rules,
            adoption_rules_en: formData.adoption_rules_en,
          }).unwrap()
        } else {
          await addAdoptionRules({
            adoption_rules: formData.adoption_rules,
            adoption_rules_en: formData.adoption_rules_en,
          }).unwrap()
        }
      }

      onSave(formData)
    } catch (error) {
      console.error('Error saving shelter info:', error)
      setErrors({
        submit: 'Помилка збереження інформації',
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <label>Логотип</label>
        <div className={styles.imageUpload}>
          {logoPreview && (
            <div className={styles.imagePreview}>
              <img src={logoPreview} alt="Logo preview" />
              <button
                type="button"
                className={styles.removeImageButton}
                onClick={() => handleRemoveImage('logo')}
              >
                ×
              </button>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 'logo')}
          />
          {errors.logo && <span className={styles.error}>{errors.logo}</span>}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Фото на головну сторінку</label>
        <div className={styles.imageUpload}>
          {mainPhotoPreview && (
            <div className={styles.imagePreview}>
              <img src={mainPhotoPreview} alt="Main photo preview" />
              <button
                type="button"
                className={styles.removeImageButton}
                onClick={() => handleRemoveImage('main_photo')}
              >
                ×
              </button>
            </div>
          )}
          <input
            type="file"
            accept="image/*"
            onChange={(e) => handleImageChange(e, 'main_photo')}
          />
          {errors.main_photo && (
            <span className={styles.error}>{errors.main_photo}</span>
          )}
        </div>
      </div>

      <div className={styles.formGroup}>
        <label>Назва</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Назва (англійською)</label>
        <input
          type="text"
          name="name_en"
          value={formData.name_en}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Телефон</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          required
        />
        {errors.phone && <span className={styles.error}>{errors.phone}</span>}
      </div>

      <div className={styles.formGroup}>
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>

      <div className={styles.formGroup}>
        <label>Facebook</label>
        <input
          type="url"
          name="facebook"
          value={formData.facebook}
          onChange={handleInputChange}
        />
        {errors.facebook && (
          <span className={styles.error}>{errors.facebook}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label>Instagram</label>
        <input
          type="url"
          name="instagram"
          value={formData.instagram}
          onChange={handleInputChange}
        />
        {errors.instagram && (
          <span className={styles.error}>{errors.instagram}</span>
        )}
      </div>

      <div className={styles.formGroup}>
        <label>Опис</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label>Опис (англійською)</label>
        <textarea
          name="description_en"
          value={formData.description_en}
          onChange={handleInputChange}
          required
        />
      </div>
      {errors.submit && <div className={styles.error}>{errors.submit}</div>}

      <div className={styles.buttonGroup}>
        <button type="submit" className={styles.saveButton}>
          Зберегти
        </button>
        <button
          type="button"
          className={styles.cancelButton}
          onClick={onCancel}
        >
          Скасувати
        </button>
      </div>
    </form>
  )
}

export default ShelterInfoEditor
