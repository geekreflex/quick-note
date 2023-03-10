import { User } from '@firebase/auth';

const userToJson = (user: User) => {
  const { uid, email, displayName, photoURL } = user;
  return {
    uid,
    email,
    displayName,
    photoURL,
  };
};
