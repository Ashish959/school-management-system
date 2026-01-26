// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "./authSlice";

// const store = configureStore({
//   reducer: {
//     auth: authReducer,
//   },
// });

// export default store;
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./authSlice";

import {
  persistStore,
  persistReducer,
} from "redux-persist";

import storage from "redux-persist/lib/storage";

// root reducer
const rootReducer = combineReducers({
  auth: authReducer,
});

// persist config
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], 
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
