import { createBrowserRouter } from "react-router";
import App from "./App";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      // Các route con sau này bạn có thể thêm ở đây
      {
        path: "about",
        element: <div>Trang Giới thiệu</div>,
      },
    ],
  },
  {
    path: "*",
    element: <div>404 - Không tìm thấy trang</div>,
  },
]);
