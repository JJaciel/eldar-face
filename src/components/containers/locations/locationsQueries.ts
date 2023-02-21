import { gql } from "@apollo/client";

const GET_LOCATIONS_QUERY = gql`
  query GetLocations {
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

export const GET_LOCATIONS = {
  query: GET_LOCATIONS_QUERY,
  name: "GetLocations",
};

const GET_LOCATION_QUERY = gql`
  query GetLocation($locationId: String!) {
    location: getLocation(locationId: $locationId) {
      locationId
      name
      items {
        itemId
      }
      lists {
        listId
      }
    }
  }
`;

export const GET_LOCATION = {
  query: GET_LOCATION_QUERY,
  name: "GetLocation",
};
