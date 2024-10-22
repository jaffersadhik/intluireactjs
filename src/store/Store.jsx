// import { configureStore } from '@reduxjs/toolkit'
// import AuthSlice from './AuthSlice'

// export const store = configureStore({
//   reducer: {
//     Auth: AuthSlice,
//   },
// })



import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './AuthSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'persist-store',
  storage,
};

const persistedAuthReducer = persistReducer(persistConfig, authSlice.reducer);

export const store = configureStore({
  reducer: {
    Auth: persistedAuthReducer,
  },
});

export const persistor = persistStore(store);