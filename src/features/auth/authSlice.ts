import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auth } from '../../config/firebase';
import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';

interface AuthState {
  user: null | User;
  status: 'idle' | 'pending' | 'fulfilled' | 'rejected';
  error: null | string;
}

const initialState: AuthState = {
  user: null,
  status: 'idle',
  error: null,
};

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result);
      return result.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
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

export default authSlice.reducer;
