import { configureStore } from '@reduxjs/toolkit'
import authReducer from './authSlice'
import { animalApi } from './animalApi'

// export const store = configureStore({
  const store = configureStore({
  reducer: {
    auth: authReducer,
    [animalApi.reducerPath]: animalApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(animalApi.middleware),
})
export default store