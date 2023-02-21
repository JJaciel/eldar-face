import { gql } from "@apollo/client";

export const SETUP_MUTATION = gql`
  mutation SetupUser($username: String!, $locationName: String!) {
    user: updateUserUsername(username: $username) {
      username
    }
    location: createLocation(locationName: $locationName) {
      locationId
    }
  }
`;
