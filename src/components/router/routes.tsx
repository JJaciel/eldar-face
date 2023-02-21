import { redirect } from "react-router-dom";

import { AppLayout } from "../layouts/appLayout";
import { Signin } from "../containers/authentication/signin";
import { Signup } from "../containers/authentication/signup";
import { EmailVerification } from "../containers/authentication/emailVerification";
import { NotFound } from "../navigation";
import { SetupContainer } from "../containers/setup/setupContainer";
import { LocationsContainer } from "../containers/locations/locationsContainer";
import { LocationContainer } from "../containers/locations/locationContainer";
import { Account } from "../containers/account/account";
import { UserLayout } from "../layouts/userLayout";
import { Items } from "../containers/items/items";
import { ItemDetail } from "../containers/items/itemDetail";
import { Lists } from "../containers/lists/lists";
import { ListDetail } from "../containers/lists/listDetail";
import { ListFulfill } from "../containers/lists/listFulfill";
import { SetupUser } from "../containers/setup/setupUser";
import { SetupLocation } from "../containers/setup/setupLocation";

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
