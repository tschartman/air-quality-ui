import { configureStore } from '@reduxjs/toolkit'
import { locationsReducer } from './locations/locationsSlice'
import { measurementsReducer } from './measurements/measurementsSlice'
import thunk from 'redux-thunk'
import {combineReducers} from "redux"; 
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage
};

const reducers = combineReducers({
  locations: locationsReducer,
  measurements: measurementsReducer       
 });

 const persistedReducer = persistReducer(persistConfig, reducers);


 export const store = configureStore({
     reducer: persistedReducer,
     devTools: process.env.NODE_ENV !== 'production',
     middleware: [thunk]
 });
 
