import React from 'react'
import styles from './AnimalsTable.module.css'

const AnimalsTable = ({ animals, editAnimalRecord, deleteAnimalRecord }) => {
  if (!animals || animals.length === 0) {
    return <div className={styles.noData}>Немає записів</div>
  }

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ім'я</th>
            <th>Name</th>
            <th>Стать</th>
            <th>Sex</th>
            <th>Вік</th>
            <th>Розмір</th>
            <th>Size</th>
            <th>Місце знаходження</th>
            <th>Location</th>
            <th>Дії</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => (
            <tr key={animal.id}>
              <td>{animal.name}</td>
              <td>{animal.name_en}</td>
              <td>{animal.gender}</td>
              <td>{animal.gender_en}</td>
              <td>{animal.age}</td>
              <td>{animal.size}</td>
              <td>{animal.size_en}</td>
              <td>{animal.location}</td>
              <td>{animal.location_en}</td>
              <td>
                <button
                  className={styles.editButton}
                  onClick={() => editAnimalRecord(animal.id)}
                >
                  Редагувати
                </button>
                <button
                  className={styles.deleteButton}
                  onClick={() => deleteAnimalRecord(animal.id)}
                >
                  Видалити
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default AnimalsTable
