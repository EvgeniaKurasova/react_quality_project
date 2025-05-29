import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const animalApi = createApi({
  reducerPath: 'animalApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api',
    tagTypes: ['Animal'],
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
  }),
  endpoints: (builder) => ({
    getAnimals: builder.query({
      query: () => 'animals/',
      providesTags: ['Animal'],
    }),

    getAnimalById: builder.query({
      query: (id) => `animals/${id}/`,
      providesTags: ['Animal'],
    }),

    getFilteredAnimals: builder.query({
      query: (filters = {}) => ({
        url: 'animals/',
        method: 'GET',
        params: {
          type: filters.type || undefined,
          gender: filters.gender || undefined,
          size: filters.size?.length ? filters.size.join(',') : undefined,
          age: filters.age?.length ? filters.age.join(',') : undefined,
        },
      }),
      providesTags: ['Animal'],
    }),

    // Додаємо новий endpoint для POST-запиту
    addAnimal: builder.mutation({
      query: (newAnimal) => ({
        url: 'animals',
        method: 'POST',
        body: newAnimal,
      }),
      invalidatesTags: ['Animal'], // Автоматично оновить список
    }),

    createAdoptionRequest: builder.mutation({
      query: (data) => ({
        url: 'adoption-requests/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Animal'],
    }),
  }),
})

export const {
  useGetAnimalsQuery,
  useGetAnimalByIdQuery,
  useGetFilteredAnimalsQuery,
  useAddAnimalMutation,
  useCreateAdoptionRequestMutation,
} = animalApi
