import { useRoutes } from "react-router-dom";

import { AppLayout } from "../appLayout";
import { Signin } from "../authentication/signin";
import { Signup } from "../authentication/signup";
import { EmailVerification } from "../authentication/emailVerification";
import { NotFound } from "../platform/navigation/notFound";
import { Location } from "../platform/dashboard/location";
import { Account } from "../platform/account/account";
import { UserLayout } from "../platform/userLayout";
import { Items } from "../platform/items/items";
import { ItemDetail } from "../platform/items/itemDetail";
import { Lists } from "../platform/lists/lists";
import { ListDetail } from "../platform/lists/listDetail";
import { ListFulfill } from "../platform/lists/listFulfill";

export const Routes = () =>
  useRoutes([
    {
      element: <AppLayout />,
      children: [
        {
          element: <UserLayout />,
          children: [
            {
              path: "/",
              element: <Location />,
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
  ]);
