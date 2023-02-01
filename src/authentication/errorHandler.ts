import { AuthErrorCodes, AuthError } from "firebase/auth";

export function getErrorMessage(error: AuthError) {
  switch (error.code) {
    case AuthErrorCodes.USER_DELETED: {
      return {
        title: "No Account",
        description: "You have to create an account first",
      };
    }
    case AuthErrorCodes.INVALID_PASSWORD: {
      return {
        title: "Invalid credentials",
        description: "Email or password are wrong",
      };
    }
    case AuthErrorCodes.EMAIL_EXISTS: {
      return {
        title: "Account already exists",
        description: "Did you forgot your password?",
      };
    }
    default: {
      return {
        title: "Error",
        description: error.message,
      };
    }
  }
}
