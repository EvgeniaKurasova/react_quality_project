import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const adoptionRequestApi = createApi({
  reducerPath: 'adoptionRequestApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://127.0.0.1:8000/api',
  }),
  tagTypes: ['AdoptionRequest'],
  endpoints: (builder) => ({
    createAdoptionRequest: builder.mutation({
      query: (request) => ({
        url: '/adoption-requests',
        method: 'POST',
        body: request,
      }),
      invalidatesTags: ['AdoptionRequest'],
    }),
    getAdoptionRequests: builder.query({
      query: () => '/adoption-requests',
      providesTags: ['AdoptionRequest'],
    }),
    updateAdoptionRequest: builder.mutation({
      query: ({ id, ...patch }) => ({
        url: `/adoption-requests/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ['AdoptionRequest'],
    }),
  }),
})

export const {
  useCreateAdoptionRequestMutation,
  useGetAdoptionRequestsQuery,
  useUpdateAdoptionRequestMutation,
} = adoptionRequestApi
