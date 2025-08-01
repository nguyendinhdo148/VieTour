import { configureStore, combineReducers } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import companySlice from "./companySlice";
import applicationSlice from "./applicationSlice";
import saveJobSlice from "./saveJobSlice";
import blogSlice from "./blogSlice";

import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // localStorage

// Cấu hình redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // Chỉ lưu slice "auth" vào localStorage
};

// Gộp các slice lại
const rootReducer = combineReducers({
  auth: authSlice,
  job: jobSlice,
  company: companySlice,
  application: applicationSlice,
  saveJob: saveJobSlice,
  blog: blogSlice,
});

// Tạo persistedReducer từ rootReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Tạo store từ persistedReducer
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // tránh lỗi cảnh báo từ redux-persist
    }),
});

// Tạo persistor để dùng với PersistGate
export const persistor = persistStore(store);

// Export type cho RootState và AppDispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
