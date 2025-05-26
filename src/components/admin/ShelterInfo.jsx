import React from 'react'
import styles from './ShelterInfo.module.css'

const testShelter = {
  id: 1,
  logo: 'https://example.com/logo.png',
  main_photo: 'https://example.com/main_photo.jpg',
  name: 'Притулок "Друзі"',
  name_en: 'Shelter "Friends"',
  phone: '+380501234567',
  email: 'shelter@example.com',
  facebook: 'https://facebook.com/shelter',
  instagram: 'https://instagram.com/shelter',
  description: 'Наш притулок забезпечує безпечне житло для бездомних тварин.',
  description_en: 'Our shelter provides a safe home for homeless animals.',
  adoption_rules:
    'Для усиновлення тварини необхідно заповнити анкету та пройти співбесіду.',
  adoption_rules_en:
    'To adopt an animal, you need to fill out a questionnaire and pass an interview.',
}

const ShelterInfo = ({
  shelter = testShelter,
  editShelterRecord,
  deleteShelterRecord,
}) => {
  return (
    <div className={styles.tablesContainer}>
      <div className={styles.mainTableContainer}>
        <table className={styles.table}>
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
            <tr key={shelter.id || 'empty'}>
              <td className={styles.breakable}>{shelter.logo || ''}</td>
              <td className={styles.breakable}>{shelter.main_photo || ''}</td>
              <td>{shelter.name || ''}</td>
              <td>{shelter.name_en || ''}</td>
              <td>{shelter.phone || ''}</td>
              <td className={styles.breakable}>{shelter.email || ''}</td>
              <td className={styles.breakable}>{shelter.facebook || ''}</td>
              <td className={styles.breakable}>{shelter.instagram || ''}</td>
              <td>{shelter.description || ''}</td>
              <td>{shelter.description_en || ''}</td>
              <td>
                {shelter.id ? (
                  <button
                    className={styles.editButton}
                    onClick={() => editShelterRecord(shelter.id)}
                  >
                    Редагувати
                  </button>
                ) : (
                  <button
                    className={styles.addButton}
                    onClick={() => editShelterRecord(null)}
                  >
                    Додати
                  </button>
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Таблиця для правил усиновлення */}
      <div>
      <div className={styles.rulesHeaderRow}>
        <h3 className={styles.adoptionRulesTitle}>Правила усиновлення</h3>
        <button
          className={styles.addButton}
          onClick={() => editShelterRecord(null)}
        >
          Додати правило
        </button>
      </div>
      <div className={styles.tableContainer}>
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
              shelter.id
                ? shelter.id + '-adoption-rules'
                : 'empty-adoption-rules'
            }
          >
            <td>{shelter.adoption_rules || ''}</td>
            <td>{shelter.adoption_rules_en || ''}</td>
            <td>
              {shelter.adoption_rules ? (
                <button
                  className={styles.editButton}
                  onClick={() => editShelterRecord(shelter.id)}
                >
                  Редагувати
                </button>
              ) : (
                <button
                  className={styles.addButton}
                  onClick={() => editShelterRecord(null)}
                >
                  Додати
                </button>
              )}
            </td>
          </tr>
        </tbody>
      </table>
      </div>
      </div>
    </div>
  )
}

export default ShelterInfo
