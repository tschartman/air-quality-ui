import { configureStore } from '@reduxjs/toolkit'
import { locationsReducer } from './locations/locationsSlice'
import { measurementsReducer } from './measurements/measurementsSlice'
export const store = configureStore({
  reducer: {
    locations: locationsReducer,
    measurements: measurementsReducer
  },
})