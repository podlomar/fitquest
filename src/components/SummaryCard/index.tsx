import styles from './styles.module.css';
import { Panel } from '../Panel';

interface Props {
  icon: string;
  value: number | string;
  label: string;
}

export const SummaryCard = ({ icon, value, label }: Props) => {
  return (
    <Panel className={styles.summaryCard}>
      <div className={styles.summaryIcon}>{icon}</div>
      <div className={styles.summaryContent}>
        <div className={styles.summaryValue}>{value}</div>
        <div className={styles.summaryLabel}>{label}</div>
      </div>
    </Panel>
  );
};
