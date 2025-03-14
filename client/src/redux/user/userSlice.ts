import { auth } from "@/config/firebase";
import { User } from "@/types";
import { UserReducerInitalState } from "@/types/reducerTypes";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";

const initialState: UserReducerInitalState = {
  loading: true,
  user: null,
};

//we're not adding this thunk into the userSlice inside the extraReducers field  because this is a continoous process as we have to keep a check always
// so there  is no fulfilled  state for this thunk
// export const listenToAuthState = createAsyncThunk(
//   "user/listenToAuthState",
//   async (_, { dispatch }) => {
//     return new Promise<void>(() => {
//       onAuthStateChanged(auth, (firebaseUser) => {
//         if (firebaseUser) {
//           const user = {
//             _id: firebaseUser.uid,
//             email: firebaseUser.email!,
//             name: firebaseUser.displayName!,
//           };
//           dispatch(setUser(user));
//           console.log("logged  in");
//         } else {
//           dispatch(setUser(null));
//           console.log("logged  out");
//         }
//         dispatch(setLoading(false));
//       });
//     });
//   }
// );

//!onAuthStateChanged() is an ongoing listener, not a one-time async action.
//!So we don't need to use createAsyncThunk here.

export const listenToAuthState = () => (dispatch: any) => {
  dispatch(setLoading(true)); // Set loading state initially
  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      const user = {
        _id: firebaseUser.uid,
        email: firebaseUser.email!,
        name: firebaseUser.displayName!,
      };
      dispatch(setUser(user));
      console.log("logged in");
    } else {
      dispatch(setUser(null));
      console.log("logged out");
    }
    dispatch(setLoading(false));
  });
};

const userSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
  //   extraReducers: (builder) => {
  //     builder
  //       .addCase(listenToAuthState.pending, (state) => {
  //         state.loading = true;
  //       })
  //*       For an auth listener, we don't typically have fulfilled/rejected
  //*        since the listener remains active, but you could handle other auth thunks:
  //       .addCase(loginUser.fulfilled, (state, action) => {
  //         state.user = action.payload;
  //         state.loading = false;
  //       })
  //       .addCase(loginUser.rejected, (state) => {
  //         state.loading = false;
  //         state.error = "Authentication failed";
  //       });
  //   },
});

export const { setUser, setLoading } = userSlice.actions;

//export userSlice instead of userSlice.reduers to avoid harecoding name in store
export default userSlice;
