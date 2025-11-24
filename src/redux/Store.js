// store.js
import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./CategorySlice";
import itemsReducer from "./ItemSlice";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// 1. Persist configuration
const persistConfig = {
  key: "categories",
  version: 1,
  storage,
};
const itemsPersistConfig = {
  key: "items",
  version: 1,
  storage,
};

// 2. Create persisted reducer
const persistedCategoriesReducer = persistReducer(
  persistConfig,
  categoriesReducer
);
const persistedItemsReducer = persistReducer(itemsPersistConfig, itemsReducer);
// 3. Configure store with persisted reducer
export const store = configureStore({
  reducer: {
    categories: persistedCategoriesReducer,
    items: persistedItemsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

// 4. Create and export persistor
export const persistor = persistStore(store);
