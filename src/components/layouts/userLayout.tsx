import { Outlet, useNavigate } from "react-router-dom";
import { Fade } from "@chakra-ui/react";
import { useQuery, gql } from "@apollo/client";

import { UserProvider } from "../hooks/useUserContext";
import { SetupUser, User } from "../../types/user";

const GET_USER = gql`
  query GetUser {
    user: getUser {
      userId
      email
      username
    }
  }
`;

export function UserLayout() {
  const navigate = useNavigate();
  const { loading, error, data } = useQuery<{
    user: SetupUser;
  }>(GET_USER);

  const setupUser = data?.user;

  if (error) {
    console.log(error);
    return null;
  }

  if (!loading && !setupUser) {
    console.log("error");
    return null;
  }

  if (!loading && !setupUser?.username) {
    navigate("/setup");
    return null;
  }

  if (loading || !setupUser) {
    return null; // loading screen
  }

  const user = setupUser as User;

  return (
    <UserProvider user={user}>
      <Fade in={!!user}>
        <Outlet />
      </Fade>
    </UserProvider>
  );
}
