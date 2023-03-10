import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auth } from '../../config/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

interface User {
  uid: string;
  displayName: string | null;
  email: string | null;
  photoURL: string | null;
}

interface AuthState {
  user: null | User;
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: null | string;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
  isLoggedIn: false,
};

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      return {
        uid: result.user.uid,
        displayName: result.user.displayName,
        email: result.user.email,
        photoURL: result.user.photoURL,
      };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserLoggedIn: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      state.isLoggedIn = !!action.payload;
    },
    clearAuthState: (state) => {
      state.user = null;
      state.isLoggedIn = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signInWithGoogle.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(
      signInWithGoogle.fulfilled,
      (state, action: PayloadAction<User>) => {
        state.status = 'fulfilled';
        state.user = action.payload;
      }
    );
    builder.addCase(
      signInWithGoogle.rejected,
      (state, action: PayloadAction<any>) => {
        state.status = 'rejected';
        state.error = action.payload;
      }
    );
  },
});

export const { setUserLoggedIn, clearAuthState } = authSlice.actions;
export default authSlice.reducer;
