import { Outlet, Link } from "react-router";

export default function App() {
  return (
    <div>
      <nav style={{ display: "flex", gap: "10px", padding: "10px" }}>
        <Link to="/">Trang chủ</Link>
        <Link to="/about">Giới thiệu</Link>
      </nav>
      <main>
        {/* Nơi hiển thị các component con tương ứng với URL */}
        <Outlet />
      </main>
    </div>
  );
}
