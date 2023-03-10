import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchNotes } from '../features/note/noteSlice';

const NoteList = () => {
  const dispatch = useAppDispatch();
  const notes = useAppSelector((state) => state.note.notes);

  useEffect(() => {
    dispatch(fetchNotes());
  });
  return (
    <div>
      <h1>Notes</h1>
      {notes.map((note) => (
        <div key={note.id}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
        </div>
      ))}
    </div>
  );
};

export default NoteList;
