import React, { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../../services/firebase";
import { createGenericContext } from "./createGenericContext";
import { apiSignup, apiSignin } from "../../services/auth-api";

import { AuthContextUser } from "../../types/user";
import {
  FirebaseAuthUser,
  LoginCredentialInput,
} from "../../types/authentication";

// Generate context
const [useAuthContext, AuthContextProvider] = createGenericContext<{
  isLoading: boolean;
  authUser?: AuthContextUser;
  signup: (userAccount: LoginCredentialInput) => Promise<void>;
  signin: (userAccount: LoginCredentialInput) => Promise<void>;
  signout: () => Promise<void>;
}>();

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [authUser, setAuthUser] = useState<FirebaseAuthUser>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setAuthUser((user as FirebaseAuthUser) || undefined);
      setIsLoading(false);
    });
    return () => {
      unsubscribe();
    };
  });

  const storeToken = (bearerToken: string) => {
    const token = bearerToken.split(" ")[1];
    sessionStorage.setItem("token", token);
  };

  useEffect(() => {
    if (!authUser) return;

    const token = sessionStorage.getItem("token");
    if (!token) {
      const getNewToken = async () => {
        try {
          const idToken = await authUser.getIdToken();
          const { headers } = await apiSignin({ idToken });
          const bearerToken: string = headers["authorization"];
          storeToken(bearerToken);
        } catch (err) {
          console.log("Error refreshing token");
        }
      };
      getNewToken();
    }
  }, [authUser]);

  const clearToken = () => {
    sessionStorage.removeItem("token");
  };

  const signup = async (userAccount: LoginCredentialInput) => {
    const apiResponse = await apiSignup(userAccount);
    const bearerToken: string = apiResponse.headers["authorization"];
    storeToken(bearerToken);
    const customToken = apiResponse.headers["f-token"];
    await signInWithCustomToken(auth, customToken);
  };

  const signout = async () => {
    await signOut(auth);
    clearToken();
  };

  const signin = async ({ email, password }: LoginCredentialInput) => {
    try {
      const authUserCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = await authUserCredential.user.getIdToken();
      const { headers } = await apiSignin({ idToken });

      const bearerToken: string = headers["authorization"];
      storeToken(bearerToken);
    } catch (e) {
      await signout();
      throw e;
    }
  };

  return (
    <AuthContextProvider
      value={{
        isLoading,
        authUser: authUser
          ? {
              userId: authUser.uid,
              email: authUser.email,
              emailVerified: authUser.emailVerified,
            }
          : undefined,
        signup,
        signin,
        signout,
      }}
    >
      {children}
    </AuthContextProvider>
  );
};

export { useAuthContext, AuthProvider };
