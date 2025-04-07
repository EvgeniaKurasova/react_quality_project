import React from 'react'
import styles from './AdoptionRequestsTable.module.css'

const AdoptionRequestsTable = ({ requests }) => {
  if (!requests || requests.length === 0) {
    return <div className={styles.noData}>Немає записів</div>
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ім'я</th>
            <th>Електронна пошта</th>
            <th>Телефон</th>
            <th>Місто</th>
            <th>Коментар</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.name}</td>
              <td>{request.email}</td>
              <td>{request.phone}</td>
              <td>{request.city}</td>
              <td>{request.comment}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AdoptionRequestsTable
