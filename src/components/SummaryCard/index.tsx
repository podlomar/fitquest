interface Props {
  icon: string;
  value: number | string;
  label: string;
}

export const SummaryCard = ({ icon, value, label }: Props) => {
  return (
    <div className="summary-card">
      <div className="summary-icon">{icon}</div>
      <div className="summary-content">
        <div className="summary-value">{value}</div>
        <div className="summary-label">{label}</div>
      </div>
    </div>
  );
};
