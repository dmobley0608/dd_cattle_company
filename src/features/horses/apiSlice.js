import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const api = createApi({
    reducerPath:'Api',
    baseQuery:fetchBaseQuery({baseUrl:'/api/'}),
    tagTypes:['Media'],
    endpoints:((builder)=>({
        getMediaByHorseId: builder.query(
            {
                query:(id)=>(`media/${id}`), 
                providesTags:['Media'],
               
            },),
        addMediaByHorseId: builder.mutation({
            query:({...body})=>({
                url:`media/${body.id}/${body.name}`,
                method:"POST",
                invalidatesTags:['Media'],
                body,
                formData:true
            }),
            invalidatesTags:['Media']
        }),
        deleteMediaById:builder.mutation({
            query:(fileId, token)=>({
                url:`media/${fileId}`,
                method:'DELETE'
            }),
            invalidatesTags:['Media']
        })
    }))
})

export const {useDeleteMediaByIdMutation, useAddMediaByHorseIdMutation, useGetMediaByHorseIdQuery, useLazyGetMediaByHorseIdQuery} = api;