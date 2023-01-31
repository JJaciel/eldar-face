import {
  ApolloClient,
  createHttpLink,
  from,
  InMemoryCache,
} from "@apollo/client";
import { GraphQLError } from "graphql";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

import { getGQLApiUrl } from "../util/envVars";
import { apiRefreshToken } from "./auth-api";

interface CustomGraphQLError extends GraphQLError {
  code: string;
  details: string;
}

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    const gqlErrors = graphQLErrors as CustomGraphQLError[];

    if (gqlErrors) {
      for (let err of gqlErrors) {
        switch (err.code) {
          case "UNAUTHENTICATED": {
            operation.setContext(() => {
              return {
                headers: {
                  Authentication: null,
                },
              };
            });

            // Retry the request, returning the new observable
            return forward(operation);
          }
        }
      }
    }
  }
);

const httpLink = createHttpLink({
  uri: getGQLApiUrl(),
});

const authLink = setContext(async (request, previousContext) => {
  if (
    previousContext.headers &&
    typeof previousContext.headers.Authentication === "object" &&
    !previousContext.headers.Authentication
  ) {
    const apiResponse = await apiRefreshToken();
    const newToken: string = apiResponse.headers["authorization"].split(" ")[1];
    sessionStorage.setItem("token", newToken);

    return {
      headers: {
        Authorization: newToken ? `Bearer ${newToken}` : null,
      },
    };
  }

  const token = sessionStorage.getItem("token") || "";
  return {
    headers: {
      Authorization: token ? `Bearer ${token}` : null,
    },
  };
});

export const getApolloClient = () => {
  return new ApolloClient({
    link: from([errorLink, authLink, httpLink]),
    cache: new InMemoryCache(),
  });
};
