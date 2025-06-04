import styles from './AnimalCard.module.css'

const AnimalCard = ({ animal }) => {
  const mainPhoto = animal.photos?.find((photo) => photo.is_main)

  // Формуємо стать
  let gender = ''
  if (animal.gender === true || animal.gender === 1 || animal.gender === '1')
    gender = 'Хлопчик'
  else if (
    animal.gender === false ||
    animal.gender === 0 ||
    animal.gender === '0'
  )
    gender = 'Дівчинка'
  else gender = '-'

  // Формуємо вік
  let age = ''
  if (animal.age_years && animal.age_months) {
    age = `${animal.age_years} років, ${animal.age_months} міс.`
  } else if (animal.age_years) {
    age = `${animal.age_years} років`
  } else if (animal.age_months) {
    age = `${animal.age_months} міс.`
  }

  return (
    <div className={styles.postCard}>
      <div className={styles.animalImageWrapper}>
        {mainPhoto ? (
          <img
            className={styles.animalImage}
            src={`http://127.0.0.1:8000/storage/${mainPhoto.photo_path}`}
            alt={animal.name}
          />
        ) : (
          <div className={styles.noPhoto}>Немає фото</div>
        )}
      </div>
      <div className={styles.postInfo}>
        <h2 className={styles.postTitle}>{animal.name}</h2>
        <div className={styles.postDesc}>
          <span>{gender}</span>
          <span>{age}</span>
        </div>
        <button className={styles.postButton}>Переглянути профіль</button>
      </div>
    </div>
  )
}

export default AnimalCard
