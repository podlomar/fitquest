import { Panel } from "../Panel";
import styles from './styles.module.css';

interface Props {
  title: string;
  meta?: React.ReactNode;
  children: React.ReactNode;
}

export const Card = ({ title, meta, children }: Props) => {
  return (
    <Panel>
      <div className={styles.cardHeader}>
        <h3 className={styles.cardTitle}>{title}</h3>
        {meta && <div className={styles.cardMeta}>{meta}</div>}
      </div>
      <div className={styles.cardContent}>
        {children}
      </div>
    </Panel>
  );
};
