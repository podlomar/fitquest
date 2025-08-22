import styles from './styles.module.css';

interface Props {
  alert: 'success' | 'error' | null;
}

export const Header = ({ alert }: Props) => {
  return (
    <header className={styles.header}>
      <h1>🏃‍♂️ Fitness Tracker</h1>
      <p>Your fitness journey at a glance</p>

      {alert === 'success' && (
        <div className={`${styles.message} ${styles.success}`}>✅ Entry added successfully!</div>
      )}
      {alert === 'error' && (
        <div className={`${styles.message} ${styles.error}`}>❌ Error adding entry. Please try again.</div>
      )}

      <button id="addEntryBtn" className={styles.addEntryBtn}>+ Add New Entry</button>
    </header>
  );
};
