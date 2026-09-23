import type { ReactNode } from "react";
import styles from "../../pages/Login.module.css";

type CollapseProps = { open: boolean; children: ReactNode };

export function Collapse({ open, children }: CollapseProps) {
  return (
    <div
      className={`${styles.collapse} ${open ? styles.collapseOpen : ""}`}
      aria-hidden={!open}
    >
      <div className={styles.collapseInner}>{children}</div>
    </div>
  );
}
