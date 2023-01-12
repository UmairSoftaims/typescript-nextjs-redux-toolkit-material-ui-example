import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { FeatureKey } from "../featureKey";
import { Todo } from "../../model/Todo";
import { Env } from "../../constants"

export type TodosResponse = Todo[]

export type TodoPagination = {
    offset: number,
    limit: number
}

export const todoApi = createApi({
    reducerPath: FeatureKey.TODO,
    tagTypes: ["Todo"],
    refetchOnMountOrArgChange: 2,
    endpoints: (builder) => ({
        getTodos: builder.query({
            query: ({offset, limit}) => ({
                url: `/api/todo?offset=${offset}&limit=${limit}`,
                method: "GET",
            }),
            providesTags: ["Todo"]
        }),
        getTodo: builder.query({
            query: (id: number) => ({
                url: `/api/todo/${id}`,
                method: "GET",
            }),
            providesTags: ["Todo"]
        }),
        addTodo: builder.mutation({
            query: (todo: Todo) => ({
                url: `/api/todo`,
                method: "POST",
                body: todo
            }),
            invalidatesTags: ["Todo"]
        }),
        deleteTodo: builder.mutation({
            query: (id: number) => {
                return {
                    url: `/api/todo/${id}`,
                    method: "DELETE",
                };
            },
            invalidatesTags: ["Todo"]
        }),
        updateTodo: builder.mutation({
            query: (todo: Todo) => ({
                url: `/api/todo/${todo.id}`,
                method: "PATCH",
                body: todo
            }),
            invalidatesTags: ["Todo"]
        })
    }),
    baseQuery: fetchBaseQuery({
        baseUrl: Env.API_SERVER_URL
    })
})

export const { useGetTodosQuery, useGetTodoQuery, useAddTodoMutation, useUpdateTodoMutation, useDeleteTodoMutation } = todoApi
export { FeatureKey };

