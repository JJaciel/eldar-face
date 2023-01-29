import React, { useState, useEffect } from "react";
import {
  onAuthStateChanged,
  User,
  Auth,
  signInWithCustomToken,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import { auth } from "../services/firebase";
import { createGenericContext } from "../util/context";
import { apiSignup, apiSignin } from "../services/api-auth";

// Generate context
const [useAuthContext, AuthContextProvider] = createGenericContext<{
  isLoading: boolean;
  user?: User;
  auth: Auth;
  signup: (userAccount: { email: string; password: string }) => Promise<void>;
  signin: (userAccount: { email: string; password: string }) => Promise<void>;
  signout: () => Promise<void>;
}>();

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      const _user = user || undefined;
      setUser(_user);
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

  const clearToken = () => {
    sessionStorage.removeItem("token");
  };

  const signup = async (userAccount: { email: string; password: string }) => {
    const apiResponse = await apiSignup(userAccount);

    const bearerToken: string = apiResponse.headers["authorization"];
    storeToken(bearerToken);

    const customToken = apiResponse.headers["f-token"];
    const userCredential = await signInWithCustomToken(auth, customToken);
  };

  const signin = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    const authUserCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const idToken = await authUserCredential.user.getIdToken();
    const { data, headers } = await apiSignin({ idToken });

    const bearerToken: string = headers["authorization"];
    storeToken(bearerToken);

    const user: { uid: string; email: string } = data.user;
  };

  const signout = async () => {
    await signOut(auth);
    clearToken();
  };

  return (
    <AuthContextProvider
      value={{
        isLoading,
        user,
        auth,
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
