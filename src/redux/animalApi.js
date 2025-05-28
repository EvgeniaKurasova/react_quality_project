import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const animalApi = createApi({
  reducerPath: 'animalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api',
    tagTypes: ['Animals'],
    // додаємо токен до всіх запитів RTK query
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token
      console.log('TOKEN IN HEADER:', token)
      if (token) {
        headers.set('Authorization', `Bearer ${token}`)
      }
      return headers
    },
    // lодаємо токен до всіх запитів RTK query/>
  }), // заміни на свій URL
  endpoints: (builder) => ({
    getAnimals: builder.query({
      query: () => 'animals',
      providesTags: ['Animals'],
    }),

    // Додаємо новий endpoint для POST-запиту
    addAnimal: builder.mutation({
      query: (newAnimal) => ({
        url: 'animals',
        method: 'POST',
        body: newAnimal,
      }),
      invalidatesTags: ['Animals'], // Автоматично оновить список
    }),
  }),
})

export const { useGetAnimalsQuery, useAddAnimalMutation } = animalApi
