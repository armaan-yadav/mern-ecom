import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./counter/counterSlice";
import { userApi } from "./user/userApi";
import userSlice from "./user/userSlice";

// ...

export const store = configureStore({
  reducer: {
    counter: counterReducer,

    // is benifit hai ki value hardcode nayi krni padti
    // kalko if  we  change the name of the slice toh idhar aakr name change nayi karna padega
    // user: userSlice.reducer,
    [userSlice.name]: userSlice.reducer,

    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
