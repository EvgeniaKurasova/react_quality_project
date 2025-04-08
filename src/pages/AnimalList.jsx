import { useState } from 'react'
import Filter from '../components/Filter'
import AdoptionRequest from '../components/AdoptionRequest'

const AnimalList = () => {
  return (
    <div>
      <button>Застосувати фільтр</button>
      <button>Скинути фільтр</button>
      <Filter />
      <AdoptionRequest />
    </div>
  )
}

export default AnimalList
