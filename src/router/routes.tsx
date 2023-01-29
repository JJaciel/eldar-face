import { useRoutes } from "react-router-dom";

import { AppLayout } from "../AppLayout";
import { Signin } from "../authentication/signin";
import { Signup } from "../authentication/signup";
import { EmailVerification } from "../authentication/emailVerification";
import { NotFound } from "../navigation/notFound";
import { Dashboard } from "../dashboard/dashboard";

export const Routes = () =>
  useRoutes([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <Dashboard />,
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
