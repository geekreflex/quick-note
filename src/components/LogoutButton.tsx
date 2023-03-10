import { getAuth, signOut } from 'firebase/auth';
import { useAppDispatch } from '../app/hooks';
import { clearAuthState } from '../features/auth/authSlice';

const auth = getAuth();

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        dispatch(clearAuthState());
      })
      .catch((error) => {
        console.error('Error logging out:', error.message);
      });
  };
  return <button onClick={handleLogout}>Log out</button>;
};

export default LogoutButton;
