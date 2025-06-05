import React, { useState } from 'react'
import styles from './ShelterInfo.module.css'
import ShelterInfoEditor from './ShelterInfoEditor'
import RulesAddEdit from './RulesAddEdit'
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
  description:
    'Наш притулок займається допомогою безпритульним тваринам...Наш притулок займається допомогою безпритульним тваринам...Наш притулок займається допомогою безпритульним тваринам...Наш притулок займається допомогою безпритульним тваринам...Наш притулок займається допомогою безпритульним тваринам...',
  description_en:
    'Our shelter helps homeless animals...Our shelter helps homeless animals...Our shelter helps homeless animals...Our shelter helps homeless animals...Our shelter helps homeless animals...',
  logo: 'https://example.com/logo.jpg',
  main_photo: 'https://example.com/main.jpg',
  adoption_rules: ['Вік від 18 років', 'Дозвіл від власників житла'],
  adoption_rules_en: ['Age 18+', 'Permission from property owners'],
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

  const [isEditingRules, setIsEditingRules] = useState(false)
  const [editingField, setEditingField] = useState(null)

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
    setEditingField(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingField(null)
  }

  const handleEditRules = () => {
    setIsEditingRules(true)
  }

  const handleSaveRules = (updatedRules) => {
    // Тут буде логіка збереження правил
    console.log('Saving rules:', updatedRules)
    setIsEditingRules(false)
  }

  const handleCancelRules = () => {
    setIsEditingRules(false)
  }

  const handleDeleteRule = async () => {
    // try {
    //   await deleteAdoptionRules().unwrap()
    // } catch (err) {
    //   console.error('Error deleting rules:', err)
    // }
    // Тут можна додати логіку для видалення правил у мок-даних, якщо потрібно
    // Тут можна додати логіку для видалення правил у мок-даних
  }

  const handleFieldEdit = (field) => {
    setEditingField(field)
  }

  const handleFieldDelete = (field) => {
    // Тут можна додати логіку для видалення значення поля
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

  const renderInfoRow = (label, value, fieldName, isImage = false) => (
    <div className={styles.infoRow} key={fieldName}>
      <div className={styles.infoLabel}>{label}</div>
      <div className={styles.infoValue}>
        {isImage ? (
          value ? (
            <img
              src={value}
              alt={label}
              className={
                fieldName === 'main_photo' ? styles.mainPhoto : styles.photo
              }
            />
          ) : (
            <span className={styles.noPhoto}>Немає фото</span>
          )
        ) : (
          value || 'Не вказано'
        )}
      </div>
      <div className={styles.actionCell}>
        {value ? (
          <button
            className={styles.deleteButton}
            onClick={() => handleFieldDelete(fieldName)}
          >
            Видалити
          </button>
        ) : (
          <button
            className={styles.addButton}
            onClick={() => handleFieldEdit(fieldName)}
          >
            Додати
          </button>
        )}
      </div>
    </div>
  )

  return (
    <div className={styles.tablesContainer}>
      <div className={styles.shelterInfoPanel}>
        {renderInfoRow('Логотип', currentShelter?.logo, 'logo', true)}
        {renderInfoRow(
          'Фото на головну сторінку',
          currentShelter?.main_photo,
          'main_photo',
          true
        )}
        {renderInfoRow('Назва', currentShelter?.name, 'name')}
        {renderInfoRow('Назва англійською', currentShelter?.name_en, 'name_en')}
        {renderInfoRow('Контактний номер', currentShelter?.phone, 'phone')}
        {renderInfoRow('Електронна пошта', currentShelter?.email, 'email')}
        {renderInfoRow('Фейсбук', currentShelter?.facebook, 'facebook')}
        {renderInfoRow('Інстаграм', currentShelter?.instagram, 'instagram')}
        {renderInfoRow('Опис', currentShelter?.description, 'description')}
        {renderInfoRow(
          'Опис англійською',
          currentShelter?.description_en,
          'description_en'
        )}

        <div className={styles.actionButtons}>
          <button
            className={`${styles.cancelButton} ${
              isEditing ? styles.active : ''
            }`}
            onClick={handleCancel}
            disabled={!isEditing}
          >
            Скасувати
          </button>
          <button
            className={isEditing ? styles.saveButton : styles.editButton}
            onClick={isEditing ? handleSave : handleEdit}
          >
            {isEditing ? 'Зберегти' : 'Редагувати'}
          </button>
        </div>
      </div>

      {/* Таблиця для правил усиновлення */}
      <div>
        <div className={styles.rulesHeaderRow}>
          <h3 className={styles.adoptionRulesTitle}>Правила адопції</h3>
          {hasRules && !isEditingRules && (
            <button
              className={styles.addEditRulesButton}
              onClick={handleEditRules}
            >
              Редагувати правила
            </button>
          )}
        </div>
        <div className={styles.tableContainer}>
          {isEditingRules ? (
            <RulesAddEdit
              rules={currentShelter.adoption_rules.map((rule, idx) => ({
                uk: rule,
                en: currentShelter.adoption_rules_en[idx] || '',
              }))}
              onSave={handleSaveRules}
              onCancel={handleCancelRules}
            />
          ) : hasRules ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Правила адопції</th>
                  <th>Adoption Rules</th>
                </tr>
              </thead>
              <tbody>
                {currentShelter.adoption_rules.map((rule, idx) => (
                  <tr key={idx}>
                    <td>{rule}</td>
                    <td>{currentShelter.adoption_rules_en[idx]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className={styles.noRulesContainer}>
              <p className={styles.noRulesText}>Немає правил</p>
              <button className={styles.addButton} onClick={handleEditRules}>
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
