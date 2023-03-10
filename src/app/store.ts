import {
  configureStore,
  createSerializableStateInvariantMiddleware,
  MiddlewareArray,
} from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import noteReducer from '../features/note/noteSlice';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

const serializableMiddleware = createSerializableStateInvariantMiddleware();

export const store = configureStore({
  reducer: {
    auth: authReducer,
    note: noteReducer,
  },
  middleware: new MiddlewareArray().concat(serializableMiddleware),
});
