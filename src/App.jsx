import { RouterProvider } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";

import useRouter from "./routes/Index";
import queryClient from "./config/QueryClient";

export default function App() {
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  )
}
