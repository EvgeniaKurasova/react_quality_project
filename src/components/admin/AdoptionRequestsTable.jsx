import React, { useState } from 'react'
import styles from './AdoptionRequestsTable.module.css'

// Тестові дані для перегляду таблиці
const testRequests = [
  {
    id: 1,
    name: 'Олена',
    lastName: 'Іваненко',
    phone: '+380501234567',
    city: 'Київ',
    email: 'olena@gmail.com',
    comment: 'Дуже хочу забрати додому!',
    animalID: 101,
    animalName: 'Барсик',
  },
  {
    id: 2,
    name: 'Петро',
    lastName: 'Петренко',
    phone: '+380671112233',
    city: 'Львів',
    email: 'petro@gmail.com',
    comment: 'Чи можна дізнатися більше про характер?',
    animalID: 102,
    animalName: 'Мурчик',
  },
  {
    id: 3,
    name: 'Ірина',
    lastName: 'Коваленко',
    phone: '+380931234567',
    city: 'Одеса',
    email: 'iryna@gmail.com',
    comment: 'Готова приїхати на вихідних.',
    animalID: 101,
    animalName: 'Барсик',
  },
]

const AdoptionRequestsTable = ({ requests = testRequests }) => {
  const [isViewed, setIsViewed] = useState({})
  if (!requests || requests.length === 0) {
    return <div className={styles.noData}>Немає записів</div>
  }
  const toggleViewed = (requestId) => {
    setIsViewed((prev) => ({
      ...prev,
      [requestId]: !prev[requestId],
    }))
  }
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr
            key={requests.id}
            className={isViewed[requests.id] ? styles.viewed : ''}
          >
            <th>Ім'я тварини</th>
            <th>Ім'я</th>
            <th>Прізвище</th>
            <th>Телефон</th>
            <th>Електронна пошта</th>
            <th>Місто</th>
            <th>Коментар</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr
              key={request.id}
              className={`${isViewed[request.id] ? styles.viewed : ''}`}
            >
              <td>{request.animalName}</td>
              <td>{request.name}</td>
              <td>{request.lastName}</td>
              <td>{request.phone}</td>
              <td>{request.email}</td>
              <td>{request.city}</td>
              <td className={styles.commentCell}>{request.comment}</td>
              <td className={styles.actionCell}>
                <button
                  className={`${styles.actionButton} ${styles.viewed} ${
                    isViewed[request.id] ? styles.active : ''
                  }`}
                  onClick={() => toggleViewed(request.id)}
                >
                  Переглянуто
                </button>
                <button className={`${styles.actionButton} ${styles.archive}`}>
                  Архівувати
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdoptionRequestsTable
