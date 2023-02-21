import { Outlet, useNavigate } from "react-router-dom";
import { Fade } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";

import { useAuthContext } from "../hooks/useAuthContext";
import { UserProvider } from "../hooks/useUserContext";

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

export function UserLayout() {
  const navigate = useNavigate();
  const { authUser } = useAuthContext();
  const { loading, error, data } = useQuery<{
    user: User;
  }>(GET_USER);

  const user = data?.user;

  if (error) {
    console.log(error);
    return null;
  }

  if (!loading && !user) {
    console.log("error");
    return null;
  }

  if (!loading && !user?.username) {
    navigate("/setup");
  }

  if (loading || !user) {
    return null; // loading screen
  }

  return (
    <UserProvider user={user}>
      <Fade in={!!authUser}>
        <Outlet />
      </Fade>
    </UserProvider>
  );
}
