import styles from "../../pages/Login.module.css";

type AuthModeTabsProps = {
  isRegister: boolean;
  onModeChange: (isRegister: boolean) => void;
};

export function AuthModeTabs({ isRegister, onModeChange }: AuthModeTabsProps) {
  return (
    <div className={styles.tabSwitcher}>
      <button
        type="button"
        className={`${styles.tabBtn} ${!isRegister ? styles.activeTab : ""}`}
        onClick={() => onModeChange(false)}
      >
        Đăng nhập
      </button>
      <button
        type="button"
        className={`${styles.tabBtn} ${isRegister ? styles.activeTab : ""}`}
        onClick={() => onModeChange(true)}
      >
        Đăng ký
      </button>
    </div>
  );
}
