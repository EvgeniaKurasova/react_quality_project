import {
  useGetAnimalsQuery,
  useGetFilteredAnimalsQuery,
} from '../redux/animalApi'
import { useSelector } from 'react-redux'
import styles from './AnimalCards.module.css'
import AnimalCard from './AnimalCard'

const AnimalCards = () => {
  const { isFilterApplied, filters } = useSelector((state) => state.filter)

  const {
    data: animalsResponse,
    isLoading: isLoadingAll,
    error: errorAll,
  } = useGetAnimalsQuery()
  const {
    data: filteredAnimals,
    isLoading: isLoadingFiltered,
    error: errorFiltered,
  } = useGetFilteredAnimalsQuery(isFilterApplied ? filters : {})

  const animals = isFilterApplied
    ? filteredAnimals?.data || []
    : animalsResponse?.data || []

  if (isLoadingAll || isLoadingFiltered) {
    return <div>Завантаження...</div>
  }

  if (errorAll || errorFiltered) {
    return (
      <div
        style={{
          color: 'red',
          fontSize: '18px',
          textAlign: 'center',
          marginTop: '40px',
        }}
      >
        Сталася помилка при завантаженні тварин. Спробуйте пізніше.
      </div>
    )
  }

  if (!animals.length) {
    return (
      <div
        style={{
          // fontFamily: 'Georgia',
          color: 'gray',
          fontSize: '18px',
          textAlign: 'center',
          marginTop: '40px',
        }}
      >
        Тварин не знайдено. Спробуйте змінити фільтри або повернутись пізніше.
      </div>
    )
  }

  return (
    <div className={styles.postsGrid}>
      {/* <div className={styles.animalCardsContainer}></div> */}
      {animals.map((animal) => (
        <AnimalCard key={animal.id} animal={animal} />
      ))}
    </div>
  )
}

export default AnimalCards
