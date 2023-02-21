import { gql } from "@apollo/client";

export const UPDATE_USER_USERNAME = gql`
  mutation UpdateUserUsername($username: String!) {
    updateUserUsername(username: $username) {
      username
    }
  }
`;
