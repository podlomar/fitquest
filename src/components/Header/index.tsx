import styles from './styles.module.css';

interface Props {
  alert: 'success' | 'error' | null;
}

export const Header = ({ alert }: Props) => {
  return (
    <header className={styles.header}>
      <div className={styles.headerTop}>
        <div className={styles.titleSection}>
          <div className={styles.logo} />
          <div className={styles.appTitle}>
            <h1>Fit Quest</h1>
            <p>Slay your limits, forge your strength</p>
          </div>
        </div>

        <nav className={styles.navigation}>
          <a href="/" className={styles.navLink}>📋 Entries</a>
          <a href="/workout-plan" className={styles.navLink}>💪 Workout Plan</a>
          <a href="/stats" className={styles.navLink}>📊 Statistics</a>
        </nav>
      </div>

      {alert === 'success' && (
        <div className={`${styles.message} ${styles.success}`}>✅ Entry added successfully!</div>
      )}
      {alert === 'error' && (
        <div className={`${styles.message} ${styles.error}`}>❌ Error adding entry. Please try again.</div>
      )}
    </header>
  );
};
