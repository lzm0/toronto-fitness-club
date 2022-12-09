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
    ],
    errorElement: <ErrorPage />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
