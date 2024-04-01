import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

import RootLayout from "../layouts/RootLayout";
import { getDataFromLocalStorage } from "../utils/localStorage";

export default function ProtectedRoute() {
  const storeUser = useSelector((state) => state.auth);
  const user = getDataFromLocalStorage("user");

  if(!storeUser?.userId && (user === null)) {
    return <Navigate to="/auth/login" replace />
  }

  return <RootLayout />
}
