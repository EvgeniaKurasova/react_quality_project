import React from 'react'
import styles from './UserTable.module.css'

const testUsers = [
  {
    id: 1,
    firstName: 'Олена',
    lastName: 'Іваненко',
    phone: '+380501234567',
    email: 'olena@gmail.com',
  },
  {
    id: 2,
    firstName: 'Петро',
    lastName: 'Петренко',
    phone: '+380671112233',
    email: 'petro@gmail.com',
  },
  {
    id: 3,
    firstName: 'Ірина',
    lastName: 'Коваленко',
    phone: '+380931234567',
    email: 'iryna@gmail.com',
  },
]

const UserTable = ({ users = testUsers }) => {
  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ім'я</th>
            <th>Прізвище</th>
            <th>Номер телефону</th>
            <th>Електронна пошта</th>
          </tr>
        </thead>
        <tbody>
          {users.length === 0 ? (
            <tr>
              <td colSpan={4} className={styles.noData}>
                Немає користувачів
              </td>
            </tr>
          ) : (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td className={styles.breakable}>{user.phone}</td>
                <td className={styles.breakable}>{user.email}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserTable
