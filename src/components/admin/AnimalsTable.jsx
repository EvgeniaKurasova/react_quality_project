import React, { useState } from 'react'
import styles from './AnimalsTable.module.css'
import EditAnimalInfo from './EditAnimalInfo'

const testAnimals = [
  {
    id: 1,
    name: 'Барсик',
    name_en: 'Barsik',
    type: 'Кіт',
    type_en: 'Cat',
    gender: 'Чоловіча',
    age: '2 роки',
    size: 'Середній',
    size_en: 'Medium',
    isSterilizet: 'Так',
    additional_information: 'Дуже лагідний, любить гратися.',
    additional_information_en: 'Very affectionate, loves to play.',
    photos: [
      {
        id: 101,
        photo_path: 'https://placekitten.com/80/80',
        is_main: true,
      },
      {
        id: 102,
        photo_path: 'https://placekitten.com/81/80',
        is_main: false,
      },
    ],
  },
  {
    id: 2,
    name: 'Рекс',
    name_en: 'Rex',
    type: 'Собака',
    type_en: 'Dog',
    gender: 'Чоловіча',
    age: '4 роки',
    size: 'Великий',
    size_en: 'Large',
    isSterilizet: 'Так',
    additional_information: 'Охороняє двір, дружній до дітей.',
    additional_information_en: 'Guards the yard, friendly to kids.',
    photos: [
      {
        id: 201,
        photo_path: 'https://placedog.net/80/80?id=1',
        is_main: true,
      },
      {
        id: 202,
        photo_path: 'https://placedog.net/81/80?id=2',
        is_main: false,
      },
      {
        id: 203,
        photo_path: 'https://placedog.net/82/80?id=3',
        is_main: false,
      },
    ],
  },
  {
    id: 3,
    name: 'Хомка',
    name_en: 'Homka',
    type: 'Хомʼяк',
    type_en: 'Hamster',
    gender: 'Жіноча',
    age: '6 місяців',
    size: 'Малий',
    size_en: 'Small',
    isSterilizet: 'Так',
    additional_information: 'Маленька, але дуже активна.',
    additional_information_en: 'Small but very active.',
    photos: [],
  },
]

const AnimalsTable = ({
  animals = testAnimals,
  editAnimalRecord,
  deleteAnimalRecord,
}) => {
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

  if (isEditing) {
    return (
      <EditAnimalInfo
        animal={editingAnimal}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    )
  }

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
                  <td>{animal.isSterilizet}</td>
                  <td className={styles.tdAddInfo}>{animal.additional_information}</td>
                  <td className={styles.tdAddInfo}>{animal.additional_information_en}</td>
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
      </div>
    </div>
  )
}

export default AnimalsTable
