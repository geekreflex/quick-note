import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  AnyAction,
} from '@reduxjs/toolkit';
import { noteRef, auth } from '../../config/firebase';
import {
  addDoc,
  serverTimestamp,
  where,
  query,
  getDocs,
} from 'firebase/firestore';
import { Note } from '../../types/user';

interface NoteState {
  notes: Note[];
  status: 'pending' | 'fulfilled' | 'idle' | 'rejected';
}

const initialState: NoteState = {
  notes: [],
  status: 'idle',
};

interface AddNoteParams {
  note: Note;
  userId: string | undefined;
}

export const addNote = createAsyncThunk(
  'notes/addNote',
  async ({ note, userId }: AddNoteParams, thunkAPI) => {
    try {
      const response = await addDoc(noteRef, {
        ...note,
        userId,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      const addedNote = { ...note, id: response.id };
      return addedNote;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchNotes = createAsyncThunk<Note[]>(
  'notes/fetchNotes',
  async (_, thunkAPI) => {
    try {
      const user = auth.currentUser;
      const q = query(noteRef, where('userId', '==', user?.uid));
      const querySnapshot = await getDocs(q);
      const notes = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log(notes);
      return notes;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const notesSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(fetchNotes.pending, (state) => {
      state.status = 'pending';
    });
    builder.addCase(
      fetchNotes.fulfilled,
      (state, action: PayloadAction<any>) => {
        state.status = 'fulfilled';
        state.notes = action.payload;
      }
    );
  },
});

export default notesSlice.reducer;
