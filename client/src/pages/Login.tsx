import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import type { CredentialResponse } from "@react-oauth/google";
import logoImg from "../assets/logo.png";
import { AuthModeTabs } from "../components/auth/AuthModeTabs";
import { Collapse } from "../components/auth/Collapse";
import { GoogleAuthButton } from "../components/auth/GoogleAuthButton";
import { LoginHero } from "../components/auth/LoginHero";
import styles from "./Login.module.css";

export default function Login() {
  const navigate = useNavigate();
  const [isRegister, setIsRegister] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleGoogleSuccess = async (
    credentialResponse: CredentialResponse,
  ) => {
    const id_token = credentialResponse.credential;
    if (!id_token) {
      setApiError("Google không trả về ID token.");
      return;
    }

    try {
      setApiError(null);
      const response = await fetch("http://localhost:5000/users/oauth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id_token }),
      });
      const data = await response.json();
      if (!response.ok)
        throw new Error(data.message || "Đăng nhập Google thất bại.");

      const { access_token, refresh_token } = data.result;
      localStorage.setItem("access_token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      navigate("/", { replace: true });
    } catch (error: unknown) {
      setApiError(
        error instanceof Error ? error.message : "Không thể kết nối máy chủ.",
      );
    }
  };

  const handleGoogleError = () =>
    setApiError("Đăng nhập Google thất bại hoặc đã bị hủy.");

  useEffect(() => {
    const existingToken = localStorage.getItem("access_token");
    if (existingToken) {
      navigate("/", { replace: true });
    }
  }, [navigate]);

  return (
    <LayoutGroup>
      <div className={styles.loginWrapper}>
        <LoginHero />

        <section className={styles.formSection}>
          <motion.div
            layout
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className={styles.formCard}
          >
            {/* Brand trên mobile */}
            <div className={styles.mobileBrand}>
              <img
                src={logoImg}
                alt="HUNIA Logo"
                style={{ width: 40, height: 40, borderRadius: 8 }}
              />

              <span
                style={{
                  fontSize: 24,
                  fontWeight: 800,
                  color: "#2E3A59",
                }}
              >
                HUNIA
              </span>
            </div>

            {/* Header */}
            <div className={styles.formHeader}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={isRegister ? "register-header" : "login-header"}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  <h2 className={styles.formTitle}>
                    {isRegister ? "Tạo tài khoản HUNIA" : "Chào mừng trở lại!"}
                  </h2>

                  <p className={styles.formSubtitle}>
                    {isRegister
                      ? "Tham gia cộng đồng mạng xã hội HUNIA ngay hôm nay"
                      : "Nhập thông tin của bạn để đăng nhập vào hệ thống"}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>

            {apiError && (
              <div
                style={{
                  backgroundColor: "#fee2e2",
                  border: "1px solid #f87171",
                  color: "#b91c1c",
                  padding: "10px 14px",
                  borderRadius: "8px",
                  marginBottom: "16px",
                  fontSize: "14px",
                  textAlign: "center",
                }}
              >
                {apiError}
              </div>
            )}

            {/* Chuyển giữa Đăng nhập / Đăng ký */}
            <AuthModeTabs
              isRegister={isRegister}
              onModeChange={setIsRegister}
            />

            <form
              onSubmit={(event) => event.preventDefault()}
              className={styles.authForm}
            >
              {/* ==================== ĐĂNG KÝ (Tên, Ngày sinh) ==================== */}
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
                      max={new Date().toISOString().slice(0, 10)}
                      className={styles.textInput}
                    />
                  </div>
                </div>
              </Collapse>

              {/* ==================== EMAIL ==================== */}
              <motion.div
                layout
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={styles.formGroup}
              >
                <label className={styles.formLabel}>Email</label>

                <div className={styles.inputWrapper}>
                  <Mail size={18} className={styles.inputIcon} />

                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="name@example.com"
                    className={styles.textInput}
                  />
                </div>
              </motion.div>

              {/* ==================== MẬT KHẨU ==================== */}
              <motion.div
                layout
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={styles.formGroup}
              >
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
              </motion.div>

              {/* ==================== XÁC NHẬN MẬT KHẨU ==================== */}
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
                      placeholder="••••••••"
                      className={styles.textInput}
                    />
                  </div>
                </div>
              </Collapse>

              {/* ==================== ĐĂNG NHẬP OPTIONS ==================== */}
              <Collapse open={!isRegister}>
                <div className={styles.formOptions}>
                  <label className={styles.rememberLabel}>
                    <input
                      type="checkbox"
                      name="rememberMe"
                      defaultChecked
                      tabIndex={!isRegister ? 0 : -1}
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

              {/* ==================== BUTTON ==================== */}
              <motion.button
                layout
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                type="submit"
                className={styles.submitBtn}
              >
                <span>
                  {isRegister ? "Đăng ký tài khoản" : "Đăng nhập ngay"}
                </span>

                <ArrowRight size={18} />
              </motion.button>
            </form>

            {/* Google & Terms */}
            <motion.div
              layout
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <GoogleAuthButton
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
              />

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
            </motion.div>
          </motion.div>
        </section>
      </div>
    </LayoutGroup>
  );
}
