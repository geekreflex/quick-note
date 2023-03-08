import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { auth } from '../../config/firebase';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

export const signInWithGoogle = createAsyncThunk(
  'auth/signInWithGoogle',
  async (_, { rejectWithValue }) => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      console.log(result.user);
      // return result.user;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

interface initialStateProps {
  status: 'failed' | 'loading' | 'pending' | 'success' | 'idle';
}

const initialState: initialStateProps = {
  status: 'idle',
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: {},
});

export default authSlice.reducer;
