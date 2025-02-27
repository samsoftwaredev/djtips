import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  setPersistence,
  browserLocalPersistence,
  signInWithPopup,
  updateProfile,
  User,
} from "firebase/auth";
import { firebaseAuth } from "@/constants";
import { LoginFormValues, UserFormValues } from "@/interfaces";
import Providers from "../authProviders";

setPersistence(firebaseAuth, browserLocalPersistence);
const SignIn = async ({ email, password }: LoginFormValues) => {
  const result = await signInWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  return result;
};

const SignUp = async ({ email, password }: UserFormValues) => {
  const result = await createUserWithEmailAndPassword(
    firebaseAuth,
    email,
    password
  );
  return result;
};

const SignOut = async () => {
  await signOut(firebaseAuth);
};

const SignInWithGoogle = async () => {
  const result = await signInWithPopup(firebaseAuth, Providers.googleProvider);
  return result;
};

const UpdateProfile = async (
  currentUser: User,
  displayName: string | null,
  photoURL: string | null
) => {
  const result = await updateProfile(currentUser, {
    displayName,
    photoURL,
  });
  return result;
};

export { SignIn, SignUp, SignOut, UpdateProfile, SignInWithGoogle };
