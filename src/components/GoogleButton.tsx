import { useAppDispatch } from '../app/hooks';
import { signInWithGoogle } from '../features/auth/authSlice';

const GoogleButton = () => {
  const dispatch = useAppDispatch();
  const handleSignInClick = () => {
    dispatch(signInWithGoogle());
  };
  return <button onClick={handleSignInClick}>Sign in with Google</button>;
};

export default GoogleButton;
