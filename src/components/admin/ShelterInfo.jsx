import React, { useState } from 'react'
import styles from './ShelterInfo.module.css'
import ShelterInfoEditor from './ShelterInfoEditor'
import {
  useGetShelterInfoQuery,
  useUpdateShelterInfoMutation,
  useDeleteAdoptionRulesMutation,
} from '../../redux/shelterApi'
// import { useGetShelterInfoQuery, useUpdateShelterInfoMutation, useDeleteAdoptionRulesMutation } from '../../redux/shelterApi'

// Тимчасові дані для тестування
const mockShelterData = {
  id: 1,
  name: 'Притулок "Добрі руки"',
  name_en: 'Shelter "Kind Hands"',
  phone: '+380501234567',
  email: 'shelter@example.com',
  facebook: 'https://facebook.com/shelter',
  instagram: 'https://instagram.com/shelter',
  description: 'Наш притулок займається допомогою безпритульним тваринам...',
  description_en: 'Our shelter helps homeless animals...',
  logo: 'https://example.com/logo.jpg',
  main_photo: 'https://example.com/main.jpg',
  adoption_rules:
    '1. Вік від 18 років\n2. Наявність стабільного доходу\n3. Дозвіл від власників житла',
  adoption_rules_en:
    '1. Age 18+\n2. Stable income\n3. Permission from property owners',
}

const ShelterInfo = () => {
  const [isEditing, setIsEditing] = useState(false)
  // const { data: currentShelter, isLoading, error } = useGetShelterInfoQuery()
  // const [updateShelterInfo] = useUpdateShelterInfoMutation()
  // const [deleteAdoptionRules] = useDeleteAdoptionRulesMutation()
  // const {
  //   data: currentShelter = mockShelterData,
  //   isLoading = false,
  //   error = null,
  // } = useGetShelterInfoQuery()
  // const [updateShelterInfo] = useUpdateShelterInfoMutation()
  // const [deleteAdoptionRules] = useDeleteAdoptionRulesMutation()

  // Використовуємо тільки мок-дані
  const currentShelter = mockShelterData
  const isLoading = false
  const error = null

  const handleEdit = () => {
    setIsEditing(true)
  }

  const handleSave = async (updatedData) => {
    // try {
    //   await updateShelterInfo(updatedData).unwrap()
    //   setIsEditing(false)
    // } catch (err) {
    //   console.error('Error updating shelter info:', err)
    // }

    // Тут можна додати логіку для оновлення мок-даних, якщо потрібно
    setIsEditing(false)
  }

  const handleCancel = () => {
    setIsEditing(false)
  }

  const handleDeleteRule = async () => {
    // try {
    //   await deleteAdoptionRules().unwrap()
    // } catch (err) {
    //   console.error('Error deleting rules:', err)
    // }
    // Тут можна додати логіку для видалення правил у мок-даних, якщо потрібно
  }

  if (error) {
    return <div className={styles.error}>{error.message}</div>
  }

  if (isLoading) {
    return <div className={styles.loading}>Завантаження...</div>
  }

  if (isEditing) {
    return (
      <ShelterInfoEditor
        shelter={currentShelter || {}}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    )
  }

  const hasRules =
    currentShelter?.adoption_rules || currentShelter?.adoption_rules_en

  return (
    <div className={styles.tablesContainer}>
      <div className={styles.mainTableContainer}>
        <table className={`${styles.table} ${styles.shelterTable}`}>
          <thead>
            <tr>
              <th>Логотип</th>
              <th>Фото на головну сторінку</th>
              <th>Назва</th>
              <th>Назва англійською</th>
              <th>Контактний номер</th>
              <th>Пошта</th>
              <th>Фейсбук</th>
              <th>Інстаграм</th>
              <th>Опис</th>
              <th>Опис англійською</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {currentShelter ? (
              <tr key={currentShelter.id || 'empty'}>
                <td className={styles.breakable}>
                  {currentShelter.logo || ''}
                </td>
                <td className={styles.breakable}>
                  {currentShelter.main_photo || ''}
                </td>
                <td>{currentShelter.name || ''}</td>
                <td>{currentShelter.name_en || ''}</td>
                <td>{currentShelter.phone || ''}</td>
                <td className={styles.breakable}>
                  {currentShelter.email || ''}
                </td>
                <td className={styles.breakable}>
                  {currentShelter.facebook || ''}
                </td>
                <td className={styles.breakable}>
                  {currentShelter.instagram || ''}
                </td>
                <td>{currentShelter.description || ''}</td>
                <td>{currentShelter.description_en || ''}</td>
                <td>
                  <button className={styles.editButton} onClick={handleEdit}>
                    Редагувати
                  </button>
                </td>
              </tr>
            ) : (
              <tr>
                <td colSpan="11" className={styles.noData}>
                  <div className={styles.noDataContainer}>
                    <p>Немає даних про притулок</p>
                    <button className={styles.addButton} onClick={handleEdit}>
                      Додати інформацію
                    </button>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Таблиця для правил усиновлення */}
      <div>
        <div className={styles.rulesHeaderRow}>
          <h3 className={styles.adoptionRulesTitle}>Правила усиновлення</h3>
          {hasRules ? (
            <button className={styles.addButton} onClick={handleEdit}>
              Додати правило
            </button>
          ) : null}
        </div>
        <div className={styles.tableContainer}>
          {hasRules ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Правила усиновлення</th>
                  <th>Adoption Rules</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  key={
                    currentShelter.id
                      ? currentShelter.id + '-adoption-rules'
                      : 'empty-adoption-rules'
                  }
                >
                  <td>{currentShelter.adoption_rules || ''}</td>
                  <td>{currentShelter.adoption_rules_en || ''}</td>
                  <td className={styles.actionCell}>
                    <div className={styles.buttonGroup}>
                      <button
                        className={styles.editButton}
                        onClick={handleEdit}
                      >
                        Редагувати
                      </button>
                      <button
                        className={styles.deleteButton}
                        onClick={handleDeleteRule}
                      >
                        Видалити
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <div className={styles.noRulesContainer}>
              <p className={styles.noRulesText}>Немає правил</p>
              <button className={styles.addButton} onClick={handleEdit}>
                Додати правило
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ShelterInfo
