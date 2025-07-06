import { configureStore } from '@reduxjs/toolkit'
import brandReducer from '@/store/brandSlice'

export const store = configureStore({
  reducer: {
    brand: brandReducer,
  },
})