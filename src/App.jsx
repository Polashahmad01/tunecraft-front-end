import { RouterProvider } from "react-router-dom";

import { router } from "./routes/Index";

export default function App() {

  return (
    <RouterProvider router={router} />
  )
}
