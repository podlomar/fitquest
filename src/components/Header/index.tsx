import styles from './styles.module.css';
import { Button } from '../Button';

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

      <Button id="addEntryBtn" variant="primary" size="lg">+ Add New Entry</Button>
    </header>
  );
};
