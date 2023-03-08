import { useAppDispatch } from './app/hooks';
import { signInWithGoogle } from './features/auth/authSlice';

function App() {
  const dispatch = useAppDispatch();
  return (
    <div className="App">
      <button onClick={() => dispatch(signInWithGoogle())}>
        Signin with Gooogle
      </button>
      <h1>Hello</h1>
    </div>
  );
}

export default App;
