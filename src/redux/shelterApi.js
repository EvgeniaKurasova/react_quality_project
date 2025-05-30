import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api'

export const shelterApi = createApi({
  reducerPath: 'shelterApi',
  baseQuery: fetchBaseQuery({ baseUrl: API_URL }),
  tagTypes: ['Shelter'],
  endpoints: (builder) => ({
    // Отримання інформації про притулок
    getShelterInfo: builder.query({
      query: () => '/shelter',
      providesTags: ['Shelter'],
    }),

    // Оновлення інформації про притулок
    updateShelterInfo: builder.mutation({
      query: (shelterData) => ({
        url: '/shelter',
        method: 'PUT',
        body: shelterData,
      }),
      invalidatesTags: ['Shelter'],
    }),

    // Додавання правил усиновлення
    addAdoptionRules: builder.mutation({
      query: (rules) => ({
        url: '/shelter/rules',
        method: 'POST',
        body: rules,
      }),
      invalidatesTags: ['Shelter'],
    }),

    // Оновлення правил усиновлення
    updateAdoptionRules: builder.mutation({
      query: (rules) => ({
        url: '/shelter/rules',
        method: 'PUT',
        body: rules,
      }),
      invalidatesTags: ['Shelter'],
    }),

    // Видалення правил усиновлення
    deleteAdoptionRules: builder.mutation({
      query: () => ({
        url: '/shelter/rules',
        method: 'DELETE',
      }),
      invalidatesTags: ['Shelter'],
    }),

    // Завантаження зображення
    uploadImage: builder.mutation({
      query: (formData) => ({
        url: '/shelter/upload',
        method: 'POST',
        body: formData,
      }),
      invalidatesTags: ['Shelter'],
    }),
  }),
})

export const {
  useGetShelterInfoQuery,
  useUpdateShelterInfoMutation,
  useAddAdoptionRulesMutation,
  useUpdateAdoptionRulesMutation,
  useDeleteAdoptionRulesMutation,
  useUploadImageMutation,
} = shelterApi
