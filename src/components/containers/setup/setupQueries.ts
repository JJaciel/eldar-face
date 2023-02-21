import { gql } from "@apollo/client";

const GET_SETUP_USER_QUERY = gql`
  query GetSetupUser {
    user: getUser {
      userId
      email
      username
    }
  }
`;

export const GET_SETUP_USER = {
  query: GET_SETUP_USER_QUERY,
  name: "GetSetupUser",
};

const GET_SETUP_LOCATIONS_QUERY = gql`
  query GetSetupLocations {
    locations: getLocations {
      locationId
      name
      items {
        itemId
        name
      }
      lists {
        listId
        name
      }
    }
  }
`;

export const GET_SETUP_LOCATIONS = {
  query: GET_SETUP_LOCATIONS_QUERY,
  name: "GetSetupLocations",
};
