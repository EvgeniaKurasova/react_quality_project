import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  filters: {
    type: '',
    gender: '',
    size: [],
    age: [],
  },
  isFilterApplied: false,
}

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload
    },
    setIsFilterApplied: (state, action) => {
      state.isFilterApplied = action.payload
    },
    resetFilters: (state) => {
      state.filters = initialState.filters
      state.isFilterApplied = false
    },
  },
})

export const { setFilters, setIsFilterApplied, resetFilters } =
  filterSlice.actions
export default filterSlice.reducer
