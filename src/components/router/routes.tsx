import { redirect } from "react-router-dom";

import { AppLayout } from "../layouts/appLayout";
import { Signin } from "../containers/authentication/signin";
import { Signup } from "../containers/authentication/signup";
import { EmailVerification } from "../containers/authentication/emailVerification";
import { NotFound } from "../common/error";
import { SetupContainer } from "../containers/setup/setupContainer";
import { LocationsOutlet } from "../containers/locations/locationsOutlet";
import { LocationContainer } from "../containers/locations/locationContainer";
import { LocationDetail } from "../containers/locations/locationDetail";
import { LocationItems } from "../containers/locations/locationItems";
import { LocationLists } from "../containers/locations/locationLists";
import { Locations } from "../containers/locations/locations";
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
            path: "/account",
            element: <Account />,
          },
          {
            path: "/locations",
            element: <LocationsOutlet />, // outlet => LocationsOutletContext
            children: [
              {
                index: true,
                element: <Locations />, // consumes LocationsOutletContext
              },
              {
                path: ":locationId",
                element: <LocationContainer />, // outlet => LocationContainerContext
                children: [
                  {
                    index: true,
                    element: <LocationDetail />, // consumes LocationContainerContext => display items & lists
                  },
                  {
                    path: "items",
                    element: <LocationItems />, // outlet =>
                    children: [
                      {
                        index: true,
                        element: <Items />, // display all items
                      },
                      {
                        path: ":itemId",
                        element: <ItemDetail />, // display single item
                      },
                    ],
                  },
                  {
                    path: "lists",
                    element: <LocationLists />, // outlet
                    children: [
                      {
                        index: true,
                        element: <Lists />, // display all lists
                      },
                      {
                        path: ":listId",
                        element: <ListDetail />, // display single list
                      },
                      {
                        path: ":listId/:fulfillmentId",
                        element: <ListFulfill />,
                      },
                    ],
                  },
                ],
              },
            ],
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
