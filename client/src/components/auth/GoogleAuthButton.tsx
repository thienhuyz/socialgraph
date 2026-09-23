import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import styles from "../../pages/Login.module.css";

type GoogleAuthButtonProps = {
  onSuccess: (response: CredentialResponse) => void;
};

export function GoogleAuthButton({ onSuccess }: GoogleAuthButtonProps) {
  return (
    <>
      {" "}
      <div className={styles.divider}>
        <span>hoặc tiếp tục với</span>
      </div>
      <div className={styles.socialGrid}>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={() => console.error("Google sign-in failed")}
          shape="rectangular"
          size="large"
          text="continue_with"
          width="420"
        />
      </div>
    </>
  );
}
