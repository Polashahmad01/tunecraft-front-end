import { createBrowserRouter } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import AuthLayout from "../layouts/AuthLayout";
import ErrorPage from "../views/ErrorPage";
import HomePage from "../views/HomePage";
import RegisterPage from "../views/RegisterPage";
import LoginPage from "../views/LoginPage";
import ForgotPasswordPage from "../views/ForgotPasswordPage";
import ResetPasswordPage from "../views/ResetPasswordPage";
export default function useRouter() {

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <HomePage />
        }
      ],
    },
    {
      path: "/auth",
      element: <AuthLayout />,
      errorElement: <ErrorPage />,
      children: [
        {
          path: "/auth/register",
          element: <RegisterPage />
        },
        {
          path: "/auth/login",
          element: <LoginPage />
        },
        {
          path: "/auth/forgot-password",
          element: <ForgotPasswordPage />
        },
        {
          path: "/auth/reset-password/:tokenId",
          element: <ResetPasswordPage />
        }
      ]
    },
    {
      path: "*",
      element: <ErrorPage />
    }
  ]);

  return router;
}
