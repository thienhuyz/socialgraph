import bannerImg from "../../assets/banner.svg";
import logoImg from "../../assets/logo.png";
import styles from "../../pages/Login.module.css";

export function LoginHero() {
  return (
    <section
      className={styles.heroSection}
      style={{
        backgroundImage: `url(${bannerImg})`,
      }}
    >
      <div className={styles.heroBody}>
        <div className={styles.heroIdentity}>
          <img src={logoImg} alt="HUNIA" className={styles.heroMark} />
          <span>HUNIA</span>
        </div>

        <h1 className={styles.heroTitle}>
          <span className={styles.heroTitleLine}>Nơi mọi</span>
          <br />
          <span className={styles.heroTitleLine}>câu chuyện</span>
          <br />
          <span className={styles.heroTitleLine}>được sẻ chia.</span>
        </h1>
      </div>

      <div className={styles.heroFooter}>
        <span>© 2026 HUNIA</span>
      </div>
    </section>
  );
}
