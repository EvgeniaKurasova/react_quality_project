import { useState } from 'react'
import styles from './Filter.module.css'
import { GoFilter } from 'react-icons/go'
import { FaPaw } from 'react-icons/fa'

const Filter = () => {
  const [selectedType, setSelectedType] = useState(null)
  const [selectedSex, setSelectedSex] = useState(null)
  const [selectedAge, setSelectedAge] = useState([])
  const [selectedSize, setSelectedSize] = useState([])
  const [isOpen, setIsOpen] = useState(false)

  const handleChangeSex = (event) => {
    const value = event.target.value
    setSelectedSex(value === selectedSex ? null : value)
  }
  const handleChangeAge = (event) => {
    const value = event.target.value

    if (selectedAge.includes(value)) {
      setSelectedAge(selectedAge.filter((option) => option !== value))
    } else {
      setSelectedAge([...selectedAge, value])
    }
  }
  const handleClickSelectedSize = (value) => {
    if (selectedSize.includes(value)) {
      // Якщо варіант вже вибраний, видаляємо його
      setSelectedSize(selectedSize.filter((option) => option !== value))
    } else {
      setSelectedSize([...selectedSize, value])
    }
  }

  const handleToggleFilter = () => {
    setIsOpen((open) => !open)
  }

  return (
    <div>
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
      ><div className={styles.filterItems}>
        <div>
        <div className={styles.filterItemRow}>
          <h4 htmlFor="dropdown">Виберіть тип:</h4>
          <select id="dropdown">
            <option value="">усі</option>
            <option value="option1">собаки</option>
            <option value="option2">коти</option>
          </select>
        </div>
        <div className={styles.filterItem}>
          <h4 className={styles.filterTitle}>Стать</h4>
          <div><label>
            <input
              type="radio"
              value="option1"
              checked={selectedSex === 'option1'}
              onChange={handleChangeSex}
            />
            Жіноча
          </label>
          <label>
            <input
              type="radio"
              value="option2"
              checked={selectedSex === 'option2'}
              onChange={handleChangeSex}
            />
            Чоловіча
          </label></div>
        </div>
        <div className={styles.filterItem}>
          <h4 className={styles.filterTitle}>Вік</h4>
          <div><label>
            <input
              type="checkbox"
              value="option1"
              checked={selectedAge.includes('option1')}
              onChange={handleChangeAge}
            />
            до року
          </label>
          <label>
            <input
              type="checkbox"
              value="option2"
              checked={selectedAge.includes('option2')}
              onChange={handleChangeAge}
            />
            1-5 років
          </label>
          <label>
            <input
              type="checkbox"
              value="option3"
              checked={selectedAge.includes('option3')}
              onChange={handleChangeAge}
            />
            5+ років
          </label>
          </div>
        </div>
        </div>
        <div className={styles.filterItem}>
          <h4 className={styles.filterTitle}>Розмір</h4>
          <div className={styles.sizeButtonGroup}>
          <button
            className={`${styles.sizeButton} ${
              selectedSize.includes('option1') ? styles.selected : ''
            }`}
            onClick={() => handleClickSelectedSize('option1')}
            type="button"
          >
            <FaPaw className={styles.pawIcon} />
            Small
          </button>
          <button
            className={`${styles.sizeButton} ${
              selectedSize.includes('option2') ? styles.selected : ''
            }`}
            onClick={() => handleClickSelectedSize('option2')}
            type="button"
          >
            <FaPaw className={styles.pawIcon} />
            Medium
          </button>
          <button
            className={`${styles.sizeButton} ${
              selectedSize.includes('option3') ? styles.selected : ''
            }`}
            onClick={() => handleClickSelectedSize('option3')}
            type="button"
          >
            <FaPaw className={styles.pawIcon} />
            Large
          </button>
          </div>
        </div>
        </div>
        <div className={styles.filterButtonBlock}>
          <button className={styles.filterButton}>Застосувати фільтр</button>
          <button className={styles.filterButton}>Скинути фільтр</button>
        </div>
      </div>
    </div>
  )
}

export default Filter
