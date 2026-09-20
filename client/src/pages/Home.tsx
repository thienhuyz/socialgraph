import { Link, useNavigate } from "react-router";

export default function Home() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("hng_user");
    navigate("/login");
  };

  return (
    <div
      style={{ padding: "40px", fontFamily: "sans-serif", textAlign: "center" }}
    >
      <h1 style={{ color: "#2E3A59", marginBottom: "12px" }}>Trang chủ HNG</h1>
      <p style={{ color: "#64748b", marginBottom: "24px" }}>
        Bạn đã đăng nhập thành công vào mạng xã hội HNG!
      </p>

      <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
        <button
          onClick={handleLogout}
          style={{
            padding: "10px 20px",
            backgroundColor: "#2E3A59",
            color: "#fff",
            border: "none",
            borderRadius: "8px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Đăng xuất
        </button>
        <Link
          to="/login"
          style={{
            padding: "10px 20px",
            backgroundColor: "#f1f5f9",
            color: "#2E3A59",
            borderRadius: "8px",
            textDecoration: "none",
            fontWeight: "bold",
            display: "inline-flex",
            alignItems: "center",
          }}
        >
          Về trang Đăng nhập
        </Link>
      </div>
    </div>
  );
}
