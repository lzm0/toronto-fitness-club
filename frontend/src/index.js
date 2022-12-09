import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Account from "./pages/account/Account";
import ErrorPage from "./pages/ErrorPage";
import Home from "./pages/Home";
import Login from "./pages/Login";

import Root from "./pages/Root";
import Signup from "./pages/Signup";

import AuthRoute from "./components/AuthRoute";
import Plans from "./pages/plans/Plans";
import Studios from "./pages/studios/Studios";
import StudioDetail, {
  loader as studioLoader,
} from "./pages/studios/StudioDetail";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "account",
        element: (
          <AuthRoute>
            <Account />
          </AuthRoute>
        ),
      },
      {
        path: "signup",
        element: <Signup />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "plans",
        element: (
          <AuthRoute>
            <Plans />
          </AuthRoute>
        ),
      },
      {
        path: "studios",
        element: (
          <AuthRoute>
            <Studios />
          </AuthRoute>
        ),
      },
      {
        path: "studios/:id",
        element: (
          <AuthRoute>
            <StudioDetail />
          </AuthRoute>
        ),
        loader: studioLoader,
      },
    ],
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={router} />);
