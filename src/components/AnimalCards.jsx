import { useGetAnimalsQuery } from '../redux/animalApi'
import styles from './AnimalCards.module.css'
import AnimalCard from './AnimalCard'

const AnimalCards = () => {
  const { data: animals, isLoading, error } = useGetAnimalsQuery()

  if (isLoading) {
    return <div className={styles.loading}>Завантаження...</div>
  }

  if (error) {
    return <div className={styles.error}>Помилка завантаження даних</div>
  }

  if (!animals || animals.length === 0) {
    return <div className={styles.noData}>Немає доступних тварин</div>
  }

  return (
    <div className={styles.postsGrid}>
      {animals.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  )
}

export default AnimalCards
