import React from "react";
import { useQuery, gql } from "@apollo/client";

import { createGenericContext } from "../util/context";

const GET_USER = gql`
  query GetUser {
    user: getUser {
      userId
      email
      username
    }
  }
`;

interface User {
  userId: string;
  email: string;
  username?: string;
}

// Generate context
const [useUserContext, UserContextProvider] = createGenericContext<{
  user?: User;
  isLoading: boolean;
}>();

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { loading, error, data } = useQuery<{
    user: User;
  }>(GET_USER);

  if (error) {
    console.log(error);
    return null;
  }

  return (
    <UserContextProvider
      value={{
        user: data?.user,
        isLoading: loading,
      }}
    >
      {children}
    </UserContextProvider>
  );
};

export { useUserContext, UserProvider };
