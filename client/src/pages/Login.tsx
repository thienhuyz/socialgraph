import { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Login.module.css";
import logoImg from "../assets/logo.png";
import {
  Mail,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  Network,
  Share2,
  Sparkles,
  Loader2,
} from "lucide-react";

export default function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: true,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Giả lập xác thực đăng nhập trong 600ms rồi lưu session và chuyển sang trang chủ
    setTimeout(() => {
      setIsLoading(false);
      const userName =
        formData.fullName.trim() ||
        formData.email.split("@")[0] ||
        "Thành viên HNG";
      localStorage.setItem(
        "hng_user",
        JSON.stringify({
          fullName: userName,
          email: formData.email,
          handle: `@${userName.toLowerCase().replace(/\s+/g, "_")}`,
        }),
      );
      navigate("/");
    }, 600);
  };

  return (
    <div className={styles.loginWrapper}>
      {/* Left Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.heroTop}>
          <img src={logoImg} alt="HNG Logo" className={styles.heroLogo} />
          <span className={styles.heroBrandName}>HNG</span>
        </div>

        <div className={styles.heroBody}>
          <div className={styles.heroBadge}>
            <Sparkles size={14} />
            <span>Mạng xã hội thế hệ mới</span>
          </div>

          <h1 className={styles.heroTitle}>
            Kết nối tri thức qua mạng lưới đồ thị thông minh.
          </h1>

          <p className={styles.heroSubtitle}>
            HNG giúp bạn khám phá các mối liên kết tiềm năng, mở rộng quan hệ
            nghề nghiệp và chia sẻ những ý tưởng giá trị cùng cộng đồng.
          </p>

          <div className={styles.featureList}>
            <div className={styles.featureItem}>
              <div className={styles.featureIconBox}>
                <Network size={18} />
              </div>
              <span>Trực quan hóa mạng lưới quan hệ đa chiều</span>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIconBox}>
                <Share2 size={18} />
              </div>
              <span>Chia sẻ bài viết & lan truyền tri thức tốc độ cao</span>
            </div>

            <div className={styles.featureItem}>
              <div className={styles.featureIconBox}>
                <ShieldCheck size={18} />
              </div>
              <span>Bảo mật dữ liệu cá nhân với tiêu chuẩn mã hóa cao cấp</span>
            </div>
          </div>
        </div>

        <div className={styles.heroFooter}>
          <div className={styles.statsHighlight}>
            <div>
              <span className={styles.statNumber}>50K+</span>
              <div>Thành viên</div>
            </div>
            <div>
              <span className={styles.statNumber}>1.2M+</span>
              <div>Liên kết tạo lập</div>
            </div>
          </div>
          <span>© 2026 HNG Network</span>
        </div>
      </section>

      {/* Right Form Section */}
      <section className={styles.formSection}>
        <div className={styles.formCard}>
          {/* Mobile Brand */}
          <div className={styles.mobileBrand}>
            <img
              src={logoImg}
              alt="HNG Logo"
              style={{ width: 40, height: 40, borderRadius: 8 }}
            />
            <span style={{ fontSize: 24, fontWeight: 800, color: "#2E3A59" }}>
              HNG
            </span>
          </div>

          <div className={styles.formHeader}>
            <h2 className={styles.formTitle}>
              {isRegister ? "Tạo tài khoản HNG" : "Chào mừng trở lại!"}
            </h2>
            <p className={styles.formSubtitle}>
              {isRegister
                ? "Tham gia cộng đồng mạng xã hội HNG ngay hôm nay"
                : "Nhập thông tin của bạn để đăng nhập vào hệ thống"}
            </p>
          </div>

          {/* Mode Tabs */}
          <div className={styles.tabSwitcher}>
            <button
              type="button"
              className={`${styles.tabBtn} ${!isRegister ? styles.activeTab : ""}`}
              onClick={() => setIsRegister(false)}
            >
              Đăng nhập
            </button>
            <button
              type="button"
              className={`${styles.tabBtn} ${isRegister ? styles.activeTab : ""}`}
              onClick={() => setIsRegister(true)}
            >
              Đăng ký
            </button>
          </div>

          {/* Auth Form */}
          <form onSubmit={handleSubmit}>
            {isRegister && (
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Họ và tên</label>
                <div className={styles.inputWrapper}>
                  <User size={18} className={styles.inputIcon} />
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className={styles.textInput}
                  />
                </div>
              </div>
            )}

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>
                Email hoặc Tên người dùng
              </label>
              <div className={styles.inputWrapper}>
                <Mail size={18} className={styles.inputIcon} />
                <input
                  type="text"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@example.com"
                  className={styles.textInput}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Mật khẩu</label>
              <div className={styles.inputWrapper}>
                <Lock size={18} className={styles.inputIcon} />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={styles.textInput}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className={styles.togglePasswordBtn}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {isRegister && (
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Xác nhận mật khẩu</label>
                <div className={styles.inputWrapper}>
                  <Lock size={18} className={styles.inputIcon} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={styles.textInput}
                  />
                </div>
              </div>
            )}

            {!isRegister && (
              <div className={styles.formOptions}>
                <label className={styles.rememberLabel}>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    style={{ accentColor: "#2E3A59" }}
                  />
                  <span>Ghi nhớ đăng nhập</span>
                </label>
                <a href="#forgot" className={styles.forgotLink}>
                  Quên mật khẩu?
                </a>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitBtn}
            >
              {isLoading ? (
                <>
                  <Loader2
                    size={18}
                    style={{ animation: "spin 1s linear infinite" }}
                  />
                  <span>Đang xử lý...</span>
                </>
              ) : (
                <>
                  <span>
                    {isRegister ? "Đăng ký tài khoản" : "Đăng nhập ngay"}
                  </span>
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Social Auth */}
          <div className={styles.divider}>
            <span>hoặc tiếp tục với</span>
          </div>

          <div className={styles.socialGrid}>
            <button
              type="button"
              className={styles.socialBtn}
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  localStorage.setItem(
                    "hng_user",
                    JSON.stringify({
                      fullName: "Google Member",
                      email: "google.user@hng.network",
                      handle: "@google_hng",
                    }),
                  );
                  navigate("/");
                }, 500);
              }}
            >
              <svg className={styles.socialIcon} viewBox="0 0 24 24">
                <path
                  fill="#EA4335"
                  d="M12 5c1.6 0 3 .6 4.1 1.7l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                />
                <path
                  fill="#4285F4"
                  d="M23.5 12.3c0-.8-.1-1.7-.2-2.3H12v4.6h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.9z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12.3 0 15.2s.7 5.5 1.9 7.9l3.7-2.9z"
                />
                <path
                  fill="#34A853"
                  d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
                />
              </svg>
              <span>Google</span>
            </button>

            <button
              type="button"
              className={styles.socialBtn}
              onClick={() => {
                setIsLoading(true);
                setTimeout(() => {
                  setIsLoading(false);
                  localStorage.setItem(
                    "hng_user",
                    JSON.stringify({
                      fullName: "GitHub Developer",
                      email: "dev@github.com",
                      handle: "@github_dev",
                    }),
                  );
                  navigate("/");
                }, 500);
              }}
            >
              <svg
                className={styles.socialIcon}
                fill="#24292F"
                viewBox="0 0 24 24"
              >
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
              <span>GitHub</span>
            </button>
          </div>

          <p className={styles.termsNote}>
            Bằng việc tiếp tục, bạn đồng ý với{" "}
            <a href="#terms" className={styles.termsLink}>
              Điều khoản dịch vụ
            </a>{" "}
            và{" "}
            <a href="#privacy" className={styles.termsLink}>
              Chính sách quyền riêng tư
            </a>{" "}
            của HNG.
          </p>
        </div>
      </section>
    </div>
  );
}
