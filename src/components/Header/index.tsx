interface Props {
  alert: 'success' | 'error' | null;
}

export const Header = ({ alert }: Props) => {
  return (
    <header>
      <h1>🏃‍♂️ Fitness Tracker</h1>
      <p>Your fitness journey at a glance</p>

      {alert === 'success' && (
        <div className="message success">✅ Entry added successfully!</div>
      )}
      {alert === 'error' && (
        <div className="message error">❌ Error adding entry. Please try again.</div>
      )}

      <button id="addEntryBtn" className="add-entry-btn">+ Add New Entry</button>
    </header>
  );
};
