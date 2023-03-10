import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useAppDispatch } from './app/hooks';
import GoogleButton from './components/GoogleButton';
import { setUserLoggedIn } from './features/auth/authSlice';

function App() {
  const dispatch = useAppDispatch();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUserLoggedIn({
            uid: user.uid,
            email: user.email,
            displayName: user.displayName,
            photoURL: user.photoURL,
          })
        );
      } else {
        dispatch(setUserLoggedIn(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  return (
    <div className="App">
      <GoogleButton />
      <h1>Hello</h1>
    </div>
  );
}

export default App;
