// src/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './auth/authSlice';

// Combine all your reducers into a rootReducer
const rootReducer = combineReducers({
  auth: authReducer,
  // Add other reducers here if you have any
});

// Create a persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // Only persist the auth reducer
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
