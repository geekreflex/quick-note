import { CreateNote } from '../components/CreateNote';
import LogoutButton from '../components/LogoutButton';
import NoteList from '../components/NoteList';

const Note = () => {
  return (
    <div>
      <h1>Note</h1>
      <LogoutButton />
      <br />
      <br />

      <CreateNote />
      <NoteList />
    </div>
  );
};

export default Note;
