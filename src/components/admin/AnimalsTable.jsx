import React, { useState } from 'react'
import styles from './AnimalsTable.module.css'
import EditAnimalInfo from './EditAnimalInfo'
import { useGetAnimalsQuery } from '../../redux/animalApi'

const AnimalsTable = ({ editAnimalRecord, deleteAnimalRecord }) => {
  const { data, isLoading, error } = useGetAnimalsQuery()
  const [isEditing, setIsEditing] = useState(false)
  const [editingAnimal, setEditingAnimal] = useState(null)

  const handleEdit = (animal) => {
    setEditingAnimal(animal)
    setIsEditing(true)
  }

  const handleSave = (updatedAnimal) => {
    // Тут буде логіка збереження оновлених даних
    console.log('Saving updated animal:', updatedAnimal)
    setIsEditing(false)
    setEditingAnimal(null)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditingAnimal(null)
  }

  if (isLoading) {
    return <div className={styles.noData}>Завантаження...</div>
  }
  // <EditAnimalInfo
  // animal={editingAnimal}
  // onSave={handleSave}
  // onCancel={handleCancel}
  if (error) {
    return (
      <div className={styles.noData}>
        Сталася помилка при завантаженні тварин
      </div>
    )
  }

  const animals = data?.data || []

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
    <div className={styles.tablesContainer}>
      <div className={styles.mainTableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Ім'я</th>
              <th>Name</th>
              <th>Вид</th>
              <th>Kind</th>
              <th>Стать</th>
              <th>Вік</th>
              <th>Розмір</th>
              <th>Size</th>
              <th>Стерелізація</th>
              <th>Додаткова інформація</th>
              <th>Additional info</th>
              <th>Фото профілю</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {animals.map((animal) => {
              const mainPhoto = (animal.photos || []).find(
                (photo) => photo.is_main
              )
              // Формуємо вік для відображення
              let age = ''
              if (animal.age_years && animal.age_months) {
                age = `${animal.age_years} років, ${animal.age_months} міс.`
              } else if (animal.age_years) {
                age = `${animal.age_years} років`
              } else if (animal.age_months) {
                age = `${animal.age_months} міс.`
              }
              // Формуємо стать для відображення
              let gender = ''
              if (
                animal.gender === true ||
                animal.gender === 1 ||
                animal.gender === '1'
              )
                gender = 'Хлопчик'
              else if (
                animal.gender === false ||
                animal.gender === 0 ||
                animal.gender === '0'
              )
                gender = 'Дівчинка'
              else gender = '-'
              return (
                <tr key={animal.animal_id}>
                  <td>{animal.name}</td>
                  <td>{animal.name_en}</td>
                  <td>{animal.type}</td>
                  <td>{animal.type_en}</td>
                  <td>{gender}</td>
                  <td>{age}</td>
                  <td>{animal.size}</td>
                  <td>{animal.size_en}</td>
                  <td>{animal.is_sterilized}</td>
                  <td className={styles.tdAddInfo}>
                    {animal.additional_information}
                  </td>
                  <td className={styles.tdAddInfo}>
                    {animal.additional_information_en}
                  </td>
                  <td>
                    {mainPhoto ? (
                      <img
                        src={`http://127.0.0.1:8000/storage/${mainPhoto.photo_path}`}
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
                      onClick={() => handleEdit(animal)}
                    >
                      Редагувати
                    </button>
                    <button
                      className={styles.deleteButton}
                      onClick={() =>
                        deleteAnimalRecord && deleteAnimalRecord(animal.id)
                      }
                    >
                      Видалити
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Додаткова таблиця для не-головних фото */}
      <div>
        <h3 className={styles.additionalPhotosTitle}>Додаткові фото</h3>
        <div className={styles.tableContainer}>
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
                  <tr key={animal.animal_id + '-extra-photos'}>
                    <td>{animal.name}</td>
                    <td>
                      {extraPhotos.length > 0 ? (
                        <div className={styles.extraPhotosCell}>
                          {extraPhotos.map((photo) => (
                            <img
                              key={photo.id}
                              src={`http://127.0.0.1:8000/storage/${photo.photo_path}`}
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
      </div>
    </div>
  )
}

export default AnimalsTable
