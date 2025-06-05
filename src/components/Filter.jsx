import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styles from './Filter.module.css'
import { GoFilter } from 'react-icons/go'
import { FaPaw } from 'react-icons/fa'
import {
  useGetAnimalsQuery,
  useGetFilteredAnimalsQuery,
} from '../redux/animalApi'
import {
  setFilters,
  setIsFilterApplied,
  resetFilters,
} from '../redux/filterSlice'

const Filter = () => {
  const dispatch = useDispatch()
  const { filters, isFilterApplied } = useSelector((state) => state.filter)

  const [selectedType, setSelectedType] = useState('')
  const [selectedGender, setSelectedGender] = useState('')
  const [selectedAge, setSelectedAge] = useState([])
  const [selectedSize, setSelectedSize] = useState([])
  const [isOpen, setIsOpen] = useState(false)

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

  // Для селекторів: якщо дані ще не завантажені або є помилка, робимо disabled
  const isDisabled = isLoadingAll || !!errorAll

  const animals = isFilterApplied
    ? filteredAnimals?.data || []
    : animalsResponse?.data || []

  const handleChangeType = (event) => {
    setSelectedType(event.target.value)
  }

  const handleChangeGender = (event) => {
    const value = event.target.value
    setSelectedGender(selectedGender === value ? '' : value)
  }

  const handleChangeAge = (event) => {
    const value = event.target.value
    if (selectedAge.includes(value)) {
      setSelectedAge(selectedAge.filter((age) => age !== value))
    } else {
      setSelectedAge([...selectedAge, value])
    }
  }

  const handleChangeSize = (size) => {
    if (selectedSize.includes(size)) {
      setSelectedSize(selectedSize.filter((s) => s !== size))
    } else {
      setSelectedSize([...selectedSize, size])
    }
  }

  const handleResetFilters = () => {
    setSelectedType('')
    setSelectedGender('')
    setSelectedSize([])
    setSelectedAge([])
    dispatch(resetFilters())
  }

  const handleApplyFilters = () => {
    const newFilters = {
      type: selectedType,
      gender: selectedGender,
      size: selectedSize,
      age: selectedAge,
    }
    dispatch(setFilters(newFilters))
    dispatch(setIsFilterApplied(true))
  }

  const handleToggleFilter = () => {
    setIsOpen((open) => !open)
  }

  // Отримуємо унікальні значення для фільтрів
  const types = [
    ...new Set(animalsResponse?.data?.map((animal) => animal.type) || []),
  ]

  const isDisabledApply =
    isLoadingAll ||
    !!errorAll ||
    !animalsResponse?.data ||
    animalsResponse.data.length === 0

  const isFiltersDefault =
    !selectedType &&
    !selectedGender &&
    selectedAge.length === 0 &&
    selectedSize.length === 0

  return (
    <div className={styles.filterContainer}>
      <div className={styles.filterCollapsed}>
        <h2>Знайти друга</h2>
        <div className={styles.filterTitle} onClick={handleToggleFilter}>
          <span className={styles.filterLabel}>Фільтри</span>
          <button className={styles.filterButtonIcon}>
            <GoFilter className={styles.filterIcon} />
          </button>
        </div>
      </div>
      <div
        className={
          isOpen
            ? `${styles.filter} ${styles.filterAnimated}`
            : `${styles.filter} ${styles.filterAnimated} ${styles.filterAnimatedClosed}`
        }
      >
        <div className={styles.filterItems}>
          <div className={styles.filterItemsRow}>
            <div className={styles.filterItemRow}>
              <h4 htmlFor="typeSelect" className={styles.h4Up}>
                Вид тварини:
              </h4>
              <select
                id="typeSelect"
                value={selectedType}
                onChange={handleChangeType}
                className={styles.select}
              >
                <option value="">Усі</option>
                {types.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
            <div className={styles.filterItemRow}>
              <h4 className={styles.filterTitle}>Стать:</h4>
              <div className={styles.filterOptions}>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={selectedGender === 'male'}
                    onChange={handleChangeGender}
                  />
                  Хлопчик
                </label>
                <label className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={selectedGender === 'female'}
                    onChange={handleChangeGender}
                  />
                  Дівчинка
                </label>
              </div>
            </div>
            <div className={styles.filterItemRow}>
              <h4 className={styles.filterTitle}>Вік:</h4>
              <div className={styles.filterOptions}>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    value="young"
                    checked={selectedAge.includes('young')}
                    onChange={handleChangeAge}
                  />
                  До 1 року
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    value="adult"
                    checked={selectedAge.includes('adult')}
                    onChange={handleChangeAge}
                  />
                  1-5 років
                </label>
                <label className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    value="senior"
                    checked={selectedAge.includes('senior')}
                    onChange={handleChangeAge}
                  />
                  Більше 5 років
                </label>
              </div>
            </div>
          </div>
          <div className={styles.filterItem}>
            <h4 className={styles.filterTitle}>Розмір:</h4>
            <div className={styles.sizeButtonGroup}>
              <button
                className={`${styles.sizeButton} ${
                  selectedSize.includes('Small') ? styles.selected : ''
                }`}
                onClick={() => handleChangeSize('Small')}
                type="button"
              >
                <FaPaw className={styles.pawIcon} />
                Small
              </button>
              <button
                className={`${styles.sizeButton} ${
                  selectedSize.includes('Medium') ? styles.selected : ''
                }`}
                onClick={() => handleChangeSize('Medium')}
                type="button"
              >
                <FaPaw className={styles.pawIcon} />
                Medium
              </button>
              <button
                className={`${styles.sizeButton} ${
                  selectedSize.includes('Large') ? styles.selected : ''
                }`}
                onClick={() => handleChangeSize('Large')}
                type="button"
              >
                <FaPaw className={styles.pawIcon} />
                Large
              </button>
            </div>
          </div>
        </div>
        <div className={styles.filterButtonBlock}>
          <button
            className={styles.filterButton}
            onClick={handleApplyFilters}
            disabled={isDisabledApply}
          >
            Застосувати фільтр
          </button>
          <button
            className={styles.filterButton}
            onClick={handleResetFilters}
            disabled={isFiltersDefault}
          >
            Скинути фільтри
          </button>
        </div>
      </div>
    </div>
  )
}

export default Filter
