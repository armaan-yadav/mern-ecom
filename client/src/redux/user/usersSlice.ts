import { auth } from "@/config/firebase";
import authServices from "@/services/userAuthServices";
import { User } from "@/types";
import { UserReducerInitalState } from "@/types/reducerTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { onAuthStateChanged } from "firebase/auth";

const initialState: UserReducerInitalState = {
  loading: true,
  user: null,
};

//we're not adding this thunk into the usersSlice inside the extraReducers field  because this is a continoous process as we have to keep a check always
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
  dispatch(setLoading(true));
  onAuthStateChanged(auth, async (firebaseUser) => {
    if (firebaseUser) {
      authServices.getCurrentUserFromDb(firebaseUser.uid).then((e) => {
        if (e?.success) {
          const user: User = e.data!;

          dispatch(setUser(user));
          console.log("logged in");
        } else {
          dispatch(setUser(null));
          console.log("logged in but error fethcing user from db");
        }
      });
    } else {
      dispatch(setUser(null));
      console.log("logged out");
    }
    dispatch(setLoading(false));
  });
};

const usersSlice = createSlice({
  initialState,
  name: "user",
  reducers: {
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      state.user = { ...state.user, ...action.payload } as User;
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

export const { setUser, setLoading, updateUser } = usersSlice.actions;

//export usersSlice instead of usersSlice.reduers to avoid harecoding name in store
export default usersSlice;
