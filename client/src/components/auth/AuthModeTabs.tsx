import { motion } from "framer-motion";
import styles from "../../pages/Login.module.css";

type AuthModeTabsProps = {
  isRegister: boolean;
  onModeChange: (isRegister: boolean) => void;
};

export function AuthModeTabs({ isRegister, onModeChange }: AuthModeTabsProps) {
  return (
    <div className={styles.tabSwitcher} role="tablist">
      <button
        type="button"
        role="tab"
        aria-selected={!isRegister}
        className={`${styles.tabBtn} ${!isRegister ? styles.activeTab : ""}`}
        onClick={() => onModeChange(false)}
      >
        {!isRegister && (
          <motion.div
            layoutId="activeTabIndicator"
            className={styles.tabIndicator}
            transition={{ type: "spring", stiffness: 450, damping: 35 }}
          />
        )}
        <span className={styles.tabBtnText}>Đăng nhập</span>
      </button>

      <button
        type="button"
        role="tab"
        aria-selected={isRegister}
        className={`${styles.tabBtn} ${isRegister ? styles.activeTab : ""}`}
        onClick={() => onModeChange(true)}
      >
        {isRegister && (
          <motion.div
            layoutId="activeTabIndicator"
            className={styles.tabIndicator}
            transition={{ type: "spring", stiffness: 450, damping: 35 }}
          />
        )}
        <span className={styles.tabBtnText}>Đăng ký</span>
      </button>
    </div>
  );
}
