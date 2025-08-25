import styles from './styles.module.css';

interface Props {
  availableWeeks: string[];
  selectedWeek: string;
}

export const WeekNavigation = ({ availableWeeks, selectedWeek }: Props) => {
  const formatWeekLabel = (week: string) => {
    const weekNum = parseInt(week.substring(0, 2), 10);
    const year = `20${week.substring(2)}`;
    return `Week ${weekNum}, ${year}`;
  };

  const currentIndex = availableWeeks.indexOf(selectedWeek);
  const prevWeek = currentIndex < availableWeeks.length - 1 ? availableWeeks[currentIndex + 1] : null;
  const nextWeek = currentIndex > 0 ? availableWeeks[currentIndex - 1] : null;

  return (
    <div className={styles.weekNavigation}>
      <div className={styles.navigationControls}>
        {prevWeek && (
          <a href={`/?week=${prevWeek}`} className={styles.navButton}>
            ← Previous Week
          </a>
        )}

        <div className={styles.weekSelector}>
          <label htmlFor="weekSelect" className={styles.weekLabel}>
            Current Week:
          </label>
          <form method="GET" className={styles.weekForm}>
            <select
              id="weekSelect"
              name="week"
              defaultValue={selectedWeek}
              className={styles.weekSelect}
            >
              {availableWeeks.map(week => (
                <option key={week} value={week}>
                  {formatWeekLabel(week)}
                </option>
              ))}
            </select>
            <button type="submit" className={styles.goButton}>Go</button>
          </form>
        </div>

        {nextWeek && (
          <a href={`/?week=${nextWeek}`} className={styles.navButton}>
            Next Week →
          </a>
        )}
      </div>

      <div className={styles.weekInfo}>
        <span className={styles.currentWeek}>
          {formatWeekLabel(selectedWeek)}
        </span>
      </div>
    </div>
  );
};
