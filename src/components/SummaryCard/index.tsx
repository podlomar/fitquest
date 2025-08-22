import styles from './styles.module.css';

interface Props {
  icon: string;
  value: number | string;
  label: string;
}

export const SummaryCard = ({ icon, value, label }: Props) => {
  return (
    <div className={styles.summaryCard}>
      <div className={styles.summaryIcon}>{icon}</div>
      <div className={styles.summaryContent}>
        <div className={styles.summaryValue}>{value}</div>
        <div className={styles.summaryLabel}>{label}</div>
      </div>
    </div>
  );
};
