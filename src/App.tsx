import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setUserLoggedIn } from './features/auth/authSlice';
import { Routes, Route } from 'react-router-dom';

import GoogleButton from './components/GoogleButton';
import LogoutButton from './components/LogoutButton';

// pages
import Auth from './pages/Auth';
import Note from './pages/Note';
import Home from './pages/Home';
import { ProtectedRoute, PublicRoute } from './routes';

function App() {
  const dispatch = useAppDispatch();
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
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
      {isLoggedIn}
      <div>
        <Routes>
          {/* <Route path="/" element={isLoggedIn ? <Note /> : <Home />} /> */}
          <Route path="/" element={<Home />} />
          <Route
            path="note"
            element={
              <ProtectedRoute isLoggedIn={isLoggedIn}>
                <Note />
              </ProtectedRoute>
            }
          />
          <Route
            path="enter"
            element={
              <PublicRoute isLoggedIn={isLoggedIn}>
                <Auth />
              </PublicRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

export default App;
