import { useRoutes } from "react-router-dom";

import { AppLayout } from "../AppLayout";

export const Routes = () =>
  useRoutes([
    {
      element: <AppLayout />,
      children: [
        {
          path: "/",
          element: <div>Dashboard</div>,
        },
        {
          path: "/signup",
          element: <div>Signup</div>,
        },
        {
          path: "/signin",
          element: <div>Signin</div>,
        },
      ],
    },
  ]);
