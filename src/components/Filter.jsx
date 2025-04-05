import { useState } from 'react'
import styles from './Filter.module.css'

const Filter = () => {
  const [selectedType, setSelectedType] = useState(null)
  const [selectedSex, setSelectedSex] = useState(null)
  const [selectedAge, setSelectedAge] = useState([])
  const [selectedSize, setSelectedSize] = useState([])
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

  return (
    <div className={styles.filter}>
      <div>
        <label htmlFor="dropdown">Виберіть тип:</label>
        <select id="dropdown">
          <option value="">усі</option>
          <option value="option1">собаки</option>
          <option value="option2">коти</option>
        </select>
      </div>
      <div>
        <label>
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
        </label>
      </div>
      <div>
        <label>
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
      <div>
        <button
          onClick={() => handleClickSelectedSize('option1')}
          style={{
            backgroundColor: selectedSize.includes('option1')
              ? 'lightblue'
              : 'white',
          }}
        >
          Малі
        </button>
        <button
          onClick={() => handleClickSelectedSize('option2')}
          style={{
            backgroundColor: selectedSize.includes('option2')
              ? 'lightblue'
              : 'white',
          }}
        >
          Середні
        </button>
        <button
          onClick={() => handleClickSelectedSize('option3')}
          style={{
            backgroundColor: selectedSize.includes('option3')
              ? 'lightblue'
              : 'white',
          }}
        >
          Великі
        </button>
      </div>
    </div>
  )
}

export default Filter
