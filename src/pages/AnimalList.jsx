import { useState } from 'react'
import Filter from '../components/Filter'

const AnimalList = () => {
  return (
    <div>
      <button>Застосувати фільтр</button>
      <button>Скинути фільтр</button>
      <Filter />
    </div>
  )
}

export default AnimalList
