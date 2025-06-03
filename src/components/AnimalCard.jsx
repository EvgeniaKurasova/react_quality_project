import { NavLink } from 'react-router-dom'
import styles from './AnimalCard.module.css'

const AnimalCard = ({ animal }) => {
  const mainPhoto = animal.photos?.find((photo) => photo.is_main)

  return (
    <div className={styles.postCard}>
      <div className={styles.animalImageWrapper}>
        {mainPhoto ? (
          <img
            className={styles.animalImage}
            src={mainPhoto.photo_path}
            alt={animal.name}
          />
        ) : (
          <div className={styles.noPhoto}>Немає фото</div>
        )}
      </div>
      <div className={styles.postInfo}>
        <h2 className={styles.postTitle}>{animal.name}</h2>
        <div className={styles.postDesc}>
          <span>{animal.gender}</span>
          <span>{animal.age}</span>
        </div>''
        <NavLink to={`/animal/${animal.id}`}>
          <button className={styles.postButton}>Переглянути профіль</button>
        </NavLink>
      </div>
    </div>
  )
}

export default AnimalCard
