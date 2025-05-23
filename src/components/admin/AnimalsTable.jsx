import React from 'react'
import styles from './AnimalsTable.module.css'

const AnimalsTable = ({ animals, editAnimalRecord, deleteAnimalRecord }) => {
  if (!animals || animals.length === 0) {
    return <div className={styles.noData}>Немає записів</div>
  }

  // Збираємо всі додаткові фото (is_main === false) з усіх тварин
  const additionalPhotos = animals.flatMap((animal) =>
    (animal.photos || [])
      .filter((photo) => !photo.is_main)
      .map((photo) => ({
        ...photo,
        animalName: animal.name,
        animalID: animal.id,
      }))
  )

  return (
    <div className={styles.tableContainer}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ім'я</th>
            <th>Name</th>
            <th>Вид</th>
            <th>Type</th>
            <th>Стать</th>
            <th>Вік</th>
            <th>Розмір</th>
            <th>Size</th>
            <th>Додаткова інформація</th>
            <th>Additional info</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => {
            const mainPhoto = (animal.photos || []).find(
              (photo) => photo.is_main
            )
            return (
              <tr key={animal.id}>
                <td>{animal.name}</td>
                <td>{animal.name_en}</td>
                <td>{animal.type}</td>
                <td>{animal.type_en}</td>
                <td>{animal.gender}</td>
                <td>{animal.age}</td>
                <td>{animal.size}</td>
                <td>{animal.size_en}</td>
                <td>{animal.additional_information}</td>
                <td>{animal.additional_information_en}</td>
                <td>
                  {mainPhoto ? (
                    <img
                      src={mainPhoto.photo_path}
                      alt="Головне фото"
                      className={styles.mainPhoto}
                    />
                  ) : (
                    <span className={styles.noPhoto}>Немає фото</span>
                  )}
                </td>
                <td>
                  <button
                    className={styles.editButton}
                    onClick={() => editAnimalRecord(animal.animalID)}
                  >
                    Редагувати
                  </button>
                  <button
                    className={styles.deleteButton}
                    onClick={() => deleteAnimalRecord(animal.animalID)}
                  >
                    Видалити
                  </button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Додаткова таблиця для не-головних фото */}
      <h3 className={styles.additionalPhotosTitle}>Додаткові фото</h3>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Ім'я тварини</th>
            <th>Додаткові фото</th>
          </tr>
        </thead>
        <tbody>
          {animals.map((animal) => {
            const extraPhotos = (animal.photos || []).filter(
              (photo) => !photo.is_main
            )
            return (
              <tr key={animal.id + '-extra-photos'}>
                <td>{animal.name}</td>
                <td>
                  {extraPhotos.length > 0 ? (
                    <div className={styles.extraPhotosCell}>
                      {extraPhotos.map((photo) => (
                        <img
                          key={photo.id}
                          src={photo.photo_path}
                          alt="Додаткове фото"
                          className={styles.photo}
                        />
                      ))}
                    </div>
                  ) : (
                    <span className={styles.noPhoto}>
                      Немає додаткових фото
                    </span>
                  )}
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

export default AnimalsTable
