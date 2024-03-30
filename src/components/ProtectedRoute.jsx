import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import { getDataFromLocalStorage } from "../utils/localStorage";

export default function ProtectedRoute() {
  const { userId } = useSelector((state) => state.auth);
  const user = getDataFromLocalStorage("user");

  if(!userId && !user?.userId) {
    return <Navigate to="/auth/login" replace />
  }

  return <RootLayout />
}
