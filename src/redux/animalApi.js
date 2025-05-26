import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const animalApi = createApi({
  reducerPath: 'animalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api',
  }), // заміни на свій URL
  endpoints: (builder) => ({
    getAnimals: builder.query({
      query: () => 'animals',
    }),
  }),
})

export const { useGetAnimalsQuery, useAddAnimalMutation } = animalsApi

export const animalsApi = createApi({
  reducerPath: 'animalsApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://your-backend-url.com/api/' }),
  tagTypes: ['Animals'], // Для автоматичного оновлення після POST
  endpoints: (builder) => ({
    getAnimals: builder.query({
        
      query: () => 'animals',
      providesTags: ['Animals'],
    }),

    // ✅ Додаємо новий endpoint для POST-запиту
    addAnimal: builder.mutation({
      query: (newAnimal) => ({
        url: 'animals',
        method: 'POST',
        body: newAnimal,
      }),
      invalidatesTags: ['Animals'], // Автоматично оновить список
    }),
  }),
});

