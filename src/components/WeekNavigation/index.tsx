import styles from './styles.module.css';
import { Button } from '../Button';

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
          <Button variant="primary" size="sm" href={`/?week=${prevWeek}`}>
            ← Previous Week
          </Button>
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
            <Button type="submit" variant="secondary" size="sm">
              Go
            </Button>
          </form>
        </div>

        {nextWeek && (
          <Button variant="primary" size="sm" href={`/?week=${nextWeek}`}>
            Next Week →
          </Button>
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
