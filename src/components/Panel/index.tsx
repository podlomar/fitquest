import styles from './styles.module.css';

interface Props {
  className?: string;
  children: React.ReactNode;
}

export const Panel = ({ className, children }: Props) => {
  return (
    <div className={`${styles.panel} ${className}`}>
      {children}
    </div>
  );
};
