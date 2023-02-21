import { User } from "firebase/auth";

export interface FirebaseAuthUser extends User {
  email: string;
}

export type LoginCredentialInput = {
  email: string;
  password: string;
};
