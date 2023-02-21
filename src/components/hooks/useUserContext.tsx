import React from "react";

import { createGenericContext } from "./createGenericContext";

interface User {
  userId: string;
  email: string;
  username?: string;
}

// Generate context
const [useUserContext, UserContextProvider] = createGenericContext<{
  user?: User;
}>();

const UserProvider = ({
  children,
  user,
}: {
  children: React.ReactNode;
  user: User;
}) => {
  return (
    <UserContextProvider
      value={{
        user,
      }}
    >
      {children}
    </UserContextProvider>
  );
};

export { useUserContext, UserProvider };
