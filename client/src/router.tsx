import { createBrowserRouter } from "react-router";
import { Home, Login } from "./pages";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "*",
    element: <div>404 - Không tìm thấy trang</div>,
  },
]);
