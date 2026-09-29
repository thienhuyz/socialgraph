import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import styles from "../../pages/Login.module.css";

type GoogleAuthButtonProps = {
  onSuccess: (response: CredentialResponse) => void;
  onError: () => void;
};

export function GoogleAuthButton({ onSuccess, onError }: GoogleAuthButtonProps) {
  return (
    <>
      <div className={styles.divider}>
        <span>hoặc tiếp tục với</span>
      </div>
      <div className={styles.socialGrid}>
        <GoogleLogin onSuccess={onSuccess} onError={onError} text="continue_with" />
      </div>
    </>
  );
}
