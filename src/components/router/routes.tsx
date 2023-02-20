import { redirect } from "react-router-dom";

import { AppLayout } from "../appLayout";
import { Signin } from "../authentication/signin";
import { Signup } from "../authentication/signup";
import { EmailVerification } from "../authentication/emailVerification";
import { NotFound } from "../navigation/notFound";
import { SetupContainer } from "../setup/setupContainer";
import { LocationsContainer } from "../locations/locationsContainer";
import { LocationContainer } from "../locations/locationContainer";
import { Account } from "../account/account";
import { UserLayout } from "../userLayout";
import { Items } from "../items/items";
import { ItemDetail } from "../items/itemDetail";
import { Lists } from "../lists/lists";
import { ListDetail } from "../lists/listDetail";
import { ListFulfill } from "../lists/listFulfill";

import { SetupUser } from "../setup/setupUser";
import { SetupLocation } from "../setup/setupLocation";

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
