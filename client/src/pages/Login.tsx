import { useState } from "react";
import { useNavigate } from "react-router";
import type { CredentialResponse } from "@react-oauth/google";
import {
  ArrowRight,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  User,
} from "lucide-react";
import logoImg from "../assets/logo.png";
import { AuthModeTabs } from "../components/auth/AuthModeTabs";
import { Collapse } from "../components/auth/Collapse";
import { GoogleAuthButton } from "../components/auth/GoogleAuthButton";
import { LoginHero } from "../components/auth/LoginHero";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();

  // UI state for switching auth mode, password visibility and submit feedback.
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date_of_birth: "",
    password: "",
    confirm_password: "",
    rememberMe: true,
  });

  // One handler keeps all controlled form fields in sync.
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const saveUserAndNavigate = (user: {
    fullName: string;
    email: string;
    handle: string;
  }) => {
    localStorage.setItem("hunia_user", JSON.stringify(user));
    navigate("/");
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    window.setTimeout(() => {
      setIsLoading(false);
      const userName =
        formData.name.trim() ||
        formData.email.split("@")[0] ||
        "Thành viên HUNIA";
      saveUserAndNavigate({
        fullName: userName,
        email: formData.email,
        handle: `@${userName.toLowerCase().replace(/\s+/g, "_")}`,
      });
    }, 600);
  };

  const handleGoogleLogin = ({ credential }: CredentialResponse) => {
    if (!credential) return;

    // Gửi ID token cho backend để xác thực và tạo phiên đăng nhập.
    const callbackUrl = new URL(import.meta.env.VITE_GOOGLE_REDIRECT_URI);
    callbackUrl.searchParams.set("credential", credential);
    window.location.assign(callbackUrl.toString());
  };

  return (
    <div className={styles.loginWrapper}>
      <LoginHero />
      <section className={styles.formSection}>
        <div className={styles.formCard}>
          {/* Brand is shown here only on smaller screens where the hero is hidden. */}
          <div className={styles.mobileBrand}>
            <img
              src={logoImg}
              alt="HUNIA Logo"
              style={{ width: 40, height: 40, borderRadius: 8 }}
            />
            <span style={{ fontSize: 24, fontWeight: 800, color: "#2E3A59" }}>
              HUNIA
            </span>
          </div>
          <div
            className={styles.formHeader}
            key={isRegister ? "register-header" : "login-header"}
          >
            <h2 className={styles.formTitle}>
              {isRegister ? "Tạo tài khoản HUNIA" : "Chào mừng trở lại!"}
            </h2>
            <p className={styles.formSubtitle}>
              {isRegister
                ? "Tham gia cộng đồng mạng xã hội HUNIA ngay hôm nay"
                : "Nhập thông tin của bạn để đăng nhập vào hệ thống"}
            </p>
          </div>

          {/* The form changes its title and optional fields by selected mode. */}
          <AuthModeTabs isRegister={isRegister} onModeChange={setIsRegister} />

          <form onSubmit={handleSubmit} className={styles.authForm}>
            {/* Registration-only fields remain mounted to preserve the transition. */}
            <Collapse open={isRegister}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Họ và tên</label>
                <div className={styles.inputWrapper}>
                  <User size={18} className={styles.inputIcon} />
                  <input
                    type="text"
                    name="name"
                    required={isRegister}
                    tabIndex={isRegister ? 0 : -1}
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ví dụ: Nguyễn Văn A"
                    className={styles.textInput}
                  />
                </div>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Ngày sinh</label>
                <div className={styles.inputWrapper}>
                  <input
                    type="date"
                    name="date_of_birth"
                    required={isRegister}
                    tabIndex={isRegister ? 0 : -1}
                    value={formData.date_of_birth}
                    onChange={handleChange}
                    max={new Date().toISOString().slice(0, 10)}
                    className={styles.textInput}
                  />
                </div>
              </div>
            </Collapse>

            <div className={styles.formGroup}>
              <label className={styles.formLabel}>Email</label>
              <div className={styles.inputWrapper}>
                <Mail size={18} className={styles.inputIcon} />
                <input
                  type="email"
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
                  minLength={6}
                  autoComplete={
                    isRegister ? "new-password" : "current-password"
                  }
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className={styles.textInput}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((visible) => !visible)}
                  className={styles.togglePasswordBtn}
                  aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            <Collapse open={isRegister}>
              <div className={styles.formGroup}>
                <label className={styles.formLabel}>Xác nhận mật khẩu</label>
                <div className={styles.inputWrapper}>
                  <Lock size={18} className={styles.inputIcon} />
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirm_password"
                    required={isRegister}
                    tabIndex={isRegister ? 0 : -1}
                    minLength={6}
                    autoComplete="new-password"
                    value={formData.confirm_password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={styles.textInput}
                  />
                </div>
              </div>
            </Collapse>
            <Collapse open={!isRegister}>
              <div className={styles.formOptions}>
                <label className={styles.rememberLabel}>
                  <input
                    type="checkbox"
                    name="rememberMe"
                    tabIndex={!isRegister ? 0 : -1}
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    style={{ accentColor: "#2E3A59" }}
                  />
                  <span>Ghi nhớ đăng nhập</span>
                </label>
                <a
                  href="#forgot"
                  tabIndex={!isRegister ? 0 : -1}
                  className={styles.forgotLink}
                >
                  Quên mật khẩu?
                </a>
              </div>
            </Collapse>

            {/* Primary credential login or registration action. */}
            <button
              type="submit"
              disabled={isLoading}
              className={styles.submitBtn}
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className={styles.spinner} />
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

          {/* Google OAuth is delegated to the official Google button component. */}
          <GoogleAuthButton onSuccess={handleGoogleLogin} />
          <p className={styles.termsNote}>
            Tiếp tục là bạn đồng ý với{" "}
            <a href="#terms" className={styles.termsLink}>
              Điều khoản
            </a>{" "}
            &{" "}
            <a href="#privacy" className={styles.termsLink}>
              Chính sách riêng tư
            </a>
            .
          </p>
        </div>
      </section>
    </div>
  );
}
