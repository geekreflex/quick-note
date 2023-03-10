import React, { useState } from 'react';
import { useAppDispatch } from '../app/hooks';
import { addNote } from '../features/note/noteSlice';
import { Note } from '../types/user';
import { auth } from '../config/firebase';

export const CreateNote = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const dispatch = useAppDispatch();
  const user = auth.currentUser;
  const userId = user?.uid;

  const handleSubmitNote = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    const note: { title: string; content: string } = {
      title,
      content,
    };
    dispatch(addNote({ note, userId }));
  };

  return (
    <div>
      <form onSubmit={handleSubmitNote}>
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Title"
          onChange={(e) => setContent(e.target.value)}
        />
        <button>submit</button>
      </form>
    </div>
  );
};

// s there a better way to do this, like store it somewhere so that my app can access it from anywhere
