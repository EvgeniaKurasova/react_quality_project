import { configureStore } from '@reduxjs/toolkit'
import { animalApi } from './animalApi'
import { adoptionRequestApi } from './adoptionRequestApi'
import { shelterApi } from './shelterApi'
import authReducer from './authSlice'
import filterReducer from './filterSlice'

// export const store = configureStore({
const store = configureStore({
  reducer: {
    [animalApi.reducerPath]: animalApi.reducer,
    [adoptionRequestApi.reducerPath]: adoptionRequestApi.reducer,
    [shelterApi.reducerPath]: shelterApi.reducer,
    auth: authReducer,
    filter: filterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      animalApi.middleware,
      adoptionRequestApi.middleware,
      shelterApi.middleware
    ),
})

export default store
