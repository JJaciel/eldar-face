import { redirect } from "react-router-dom";

import { AppLayout } from "../appLayout";
import { Signin } from "../authentication/signin";
import { Signup } from "../authentication/signup";
import { EmailVerification } from "../authentication/emailVerification";
import { NotFound } from "../platform/navigation/notFound";
import { SetupContainer } from "../platform/setup/setupContainer";
import { LocationsContainer } from "../platform/locations/locationsContainer";
import { LocationContainer } from "../platform/locations/locationContainer";
import { Account } from "../platform/account/account";
import { UserLayout } from "../platform/userLayout";
import { Items } from "../platform/items/items";
import { ItemDetail } from "../platform/items/itemDetail";
import { Lists } from "../platform/lists/lists";
import { ListDetail } from "../platform/lists/listDetail";
import { ListFulfill } from "../platform/lists/listFulfill";

import { SetupUser } from "../platform/setup/setupUser";
import { SetupLocation } from "../platform/setup/setupLocation";

export const routes = [
  {
    element: <AppLayout />,
    children: [
      {
        path: "/setup",
        element: <SetupContainer />, // outlet
        children: [
          {
            index: true,
            element: <SetupUser />,
          },
          {
            path: ":locationId",
            element: <SetupLocation />,
          },
        ],
      },
      {
        element: <UserLayout />,
        children: [
          {
            path: "/",
            loader: async () => {
              return redirect("/locations");
            },
          },
          {
            path: "/locations",
            element: <LocationsContainer />, // outlet
            children: [
              {
                path: ":locationId",
                element: <LocationContainer />,
              },
            ],
          },
          {
            path: "/items",
            element: <Items />,
            children: [
              {
                path: ":itemId",
                element: <ItemDetail />,
              },
            ],
          },
          {
            path: "/lists",
            element: <Lists />,
            children: [
              {
                path: ":listId",
                element: <ListDetail />,
              },
              {
                path: ":listId/:fulfillmentId",
                element: <ListFulfill />,
              },
            ],
          },
          {
            path: "/account",
            element: <Account />,
          },
        ],
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/signin",
        element: <Signin />,
      },
      {
        path: "/email-verification",
        element: <EmailVerification />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
];
