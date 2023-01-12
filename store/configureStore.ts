import {
  combineReducers,
  configureStore,
  EnhancedStore,
  getDefaultMiddleware,
} from "@reduxjs/toolkit"
import { MakeStore } from "next-redux-wrapper"
import { Env } from "../constants"
import { counterReducer } from "./counter"
import { pageReducer } from "./page"
// import { todoReducer } from "./todo"
import { todoApi } from "./todo_rtk/todoApi"

const rootReducer = combineReducers({
  counter: counterReducer,
  page: pageReducer,
  // todo: todoApi,
  [todoApi.reducerPath]: todoApi.reducer,
})

export type RootState = ReturnType<typeof rootReducer>

// const middlewares = [...getDefaultMiddleware<RootState>()]
const middlewares = [...getDefaultMiddleware<RootState>()].concat(todoApi.middleware) 

const store = configureStore({
  reducer: rootReducer,
  middleware: middlewares,
  devTools: Env.NODE_ENV === "development",
})


// export type AppDispatch = typeof store.dispatch

export const makeStore: MakeStore = (_?: RootState): EnhancedStore => store
