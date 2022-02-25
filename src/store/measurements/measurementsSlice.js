import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from '../../http-service';

export const getMeasurements = createAsyncThunk('measurements/getMeasurements', async (id) => {
    const res = await http.get(`measurements?date_from=2000-01-01T00%3A00%3A00%2B00%3A00&date_to=2022-02-24T23%3A55%3A00%2B00%3A00&limit=100&page=1&offset=0&sort=desc&radius=1000&location_id=${id}&order_by=datetime`)
    return res
})

const initialState = {
    measurements: [],
    loading: false
}

const measurementsSlice = createSlice({
  name: 'measurements',
  initialState,
  reducers: {
      clearMeasurements(state, action) {
        state.measurements = []
      }
  },
  extraReducers(builder) {
    builder
      .addCase(getMeasurements.pending, (state, action) => {
        state.loading = true
      })
      .addCase(getMeasurements.fulfilled, (state, action) => {
        state.loading = false
        state.measurements = action.payload.data.results
      })
      .addCase(getMeasurements.rejected, (state, action) => {
        state.loading = false
      })
  }
})

export const { clearMeasurements } = measurementsSlice.actions
export const measurementsReducer = measurementsSlice.reducer