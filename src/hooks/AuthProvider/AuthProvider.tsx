"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { User, onAuthStateChanged } from "firebase/auth";

import { firebaseAuth } from "@/constants";
import {
  BaseProps,
  IAuth,
  LoginFormValues,
  UserFormValues,
} from "@/interfaces";
import {
  SignUp as FBSignUp,
  UpdateProfile,
  SignIn as FBSignIn,
  SignInWithGoogle,
  SignOut as FBSignOut,
} from "@/services";
import { showAlert } from "@/utils/swal";
import { alertType } from "@/constants";
import { PageLoading } from "@/components";
import { redirect } from "next/navigation";

const AuthContext = createContext<IAuth>({
  user: firebaseAuth.currentUser,
  loading: false,
  SignIn: () => {},
  SignUp: () => {},
  SignOut: () => {},
  SignInWithGoogle: () => {},
});

const AuthContextProvider = ({ children }: BaseProps) => {
  // #region state variables
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isAuthLoading, setIsAuthLoading] = useState<boolean>(true);
  // #endregion
  // #region Auth Functions
  const SignUp = async (creds: UserFormValues, onSuccess: () => void) => {
    setIsLoading(true);
    FBSignUp(creds)
      .then((userCredential) => {
        const { user } = userCredential;
        if (user) {
          setCurrentUser(user);
          UpdateProfile(user, creds.displayName, null)
            .then((result) => {
              console.log("Updated Data: ", result);
            })
            .catch((error) => {
              showAlert("Error", error.message, "Ok", alertType.ERROR);
            });
          onSuccess();
        } else {
          showAlert("Error", "Something went wrong!", "Ok", alertType.ERROR);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          showAlert(
            "Error",
            "Email already registered! Please try Sign in",
            "Ok",
            alertType.ERROR
          );
        } else if (error.code === "auth/too-many-requests") {
          showAlert(
            "Error",
            "Account disabled! Too many attempts!",
            "Ok",
            alertType.ERROR
          );
        }
        setIsLoading(false);
      });
  };

  const SignIn = async (creds: LoginFormValues, onSuccess: () => void) => {
    setIsLoading(true);
    FBSignIn(creds)
      .then((userCredential) => {
        const { user } = userCredential;
        if (user) {
          setCurrentUser(user);
          onSuccess();
        } else {
          showAlert("Error", "Something went wrong!", "Ok", alertType.ERROR);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        if (error.code === "auth/wrong-password") {
          showAlert("Error", "Password is wrong!", "Ok", alertType.ERROR);
        } else if (error.code === "auth/too-many-requests") {
          showAlert(
            "Error",
            "Account disabled! Too many attempts!",
            "Ok",
            alertType.ERROR
          );
        }
        setIsLoading(false);
      });
  };

  const LoginWithGoogle = (onSuccess: () => void) => {
    SignInWithGoogle()
      .then((userCredentials) => {
        const { user } = userCredentials;
        if (user) {
          setCurrentUser(user);
          onSuccess();
        } else {
          showAlert("Error", "Something went wrong!", "Ok", alertType.ERROR);
        }
      })
      .catch((error) => {
        showAlert("Error", error.message, "Ok", alertType.ERROR);
      });
  };

  const SignOut = async () => {
    setIsLoading(true);
    try {
      await FBSignOut();
      setCurrentUser(null);
    } catch (error) {
      console.error("Error while signing out: ", error);
      showAlert("Oops!", "Failed to Sign out", "Ok", alertType.ERROR);
    }
    setIsLoading(false);
    redirect("/signin");
  };
  // #endregion

  const authValues = {
    user: currentUser,
    loading: isLoading,
    SignIn,
    SignUp,
    SignOut,
    SignInWithGoogle: LoginWithGoogle,
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(firebaseAuth, (user) => {
      setCurrentUser(user);
      setIsAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  if (isAuthLoading) return <PageLoading />;

  return (
    <AuthContext.Provider value={authValues}>{children}</AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("AuthContext not found");
  return context;
};

export { AuthContextProvider, useAuth, AuthContext };
