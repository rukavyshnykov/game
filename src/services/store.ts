import { configureStore } from '@reduxjs/toolkit'
import { gameReducer } from './gameSlice'
 
export const store = configureStore({
  reducer: {
    game: gameReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware(),
})
 
export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>