import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "./user/usersSlice";
import { usersApi } from "./user/usersApi";
import { productsApi } from "./products/productsApi";
import adminApi from "./admin/adminApi";
import orderApi from "./order/OrderApi";

// ...

export const store = configureStore({
  reducer: {
    // is benifit hai ki value hardcode nayi krni padti
    // kalko if  we  change the name of the slice toh idhar aakr name change nayi karna padega
    // user: usersSlice.reducer,
    [usersSlice.name]: usersSlice.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [adminApi.reducerPath]: adminApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      usersApi.middleware,
      productsApi.middleware,
      adminApi.middleware,
      orderApi.middleware
    ),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
