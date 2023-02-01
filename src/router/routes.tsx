import { useRoutes } from "react-router-dom";

import { AppLayout } from "../appLayout";
import { Signin } from "../authentication/signin";
import { Signup } from "../authentication/signup";
import { EmailVerification } from "../authentication/emailVerification";
import { NotFound } from "../navigation/notFound";
import { Dashboard } from "../dashboard/dashboard";
import { Account } from "../account/account";
import { UserLayout } from "../userLayout";

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
              element: <Dashboard />,
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
