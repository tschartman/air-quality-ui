import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import http from '../../http-service';

export const getLocations = createAsyncThunk('locations/getLocations', async (entity) => {
    const res = await http.get(`locations?limit=100&page=1&offset=0&sort=desc&radius=1000&country_id=US&order_by=lastUpdated&entity=${entity}&dumpRaw=false`)
    return res
})

const initialState = {
    locations: [],
    loading: false
}

const locationsSlice = createSlice({
  name: 'locations',
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(getLocations.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.locations = action.payload.data.results
      })
      .addCase(getLocations.rejected, (state, action) => {
        state.status = 'failed'
      })
  }
})


export const locationsReducer = locationsSlice.reducer