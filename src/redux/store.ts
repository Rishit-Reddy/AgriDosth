// src/store.ts
import { configureStore, combineReducers } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import authReducer from './auth/authSlice';
import cartReducer, { CartState } from './cart/cartSlice'; // Import the cart reducer and CartState
import searchReducer, { SearchState } from './searchSlice/searchSlice'; // ImpIch redthe r

// Combine all your reducers into a rootReducer
const rootReducer = combineReducers({
  auth: authReducer,
  cart: cartReducer, // Add the cart reducer
  search: searchReducer, // Add the search reducer
});

// Create a persist config
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'cart', 'search'], // Persist both auth and cart reducers
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store with the persisted reducer
const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState> & {
  cart: CartState; // Include CartState in the RootState type
  search: SearchState;
};
export type AppDispatch = typeof store.dispatch;

export default store;
