import { FitnessEntry } from '../../types';
import { getExerciseById } from '../../routines';
import { Panel } from '../Panel';
import styles from './styles.module.css';

interface Props {
  entry: FitnessEntry;
}

export const DayEntryCard = ({ entry }: Props) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const renderPerformance = (performance: number | 'none') => {
    if (performance === 'none' || performance === 0) {
      return <span className={styles.performanceNone}>-</span>;
    }
    return (
      <div className={styles.performanceStars}>
        {Array.from({ length: 5 }, (_, i) => (
          <span
            key={i}
            className={i < performance ? styles.starFilled : styles.starEmpty}
          >
            ⭐
          </span>
        ))}
      </div>
    );
  };

  const renderWorkout = () => {
    if (entry.workout === 'rest') {
      return (
        <div className={styles.workoutRest}>
          <span className={styles.workoutIcon}>😴</span>
          <span>Rest Day</span>
        </div>
      );
    }

    return (
      <div className={styles.workoutInfo}>
        <div className={styles.workoutHeader}>
          <span className={styles.workoutRoutine}>
            {entry.workout.routine}
            {entry.workout.type === 'custom' && (
              <span className={styles.customLabel}> (Custom)</span>
            )}
          </span>
        </div>
        <div className={styles.workoutExercises}>
          {entry.workout.results.map((result) => {
            const exercise = getExerciseById(result.id);
            if (!exercise) return null;

            return (
              <div key={result.id} className={styles.exerciseResult}>
                <span className={styles.exerciseName}>{exercise.name}:</span>
                <span className={styles.exerciseValue}>
                  {'reps' in result ? result.reps : result.holds}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  const renderStairs = () => {
    if (entry.stairs === 'away') {
      return <span className={styles.stairsAway}>Away</span>;
    }
    if (entry.stairs === 'none') {
      return <span className={styles.stairsNone}>None</span>;
    }
    return (
      <div className={styles.stairsData}>
        <span>{entry.stairs.floors} floors</span>
        <span className={styles.stairsTime}>{entry.stairs.time}</span>
      </div>
    );
  };

  return (
    <Panel className={styles.dayEntry}>
      <div className={styles.dayHeader}>
        <h3 className={styles.dayDate}>{formatDate(entry.date)}</h3>
        <div className={styles.dayMeta}>
          {entry.stretching && <span className={styles.stretchingBadge}>🧘‍♀️ Stretching</span>}
        </div>
      </div>

      <div className={styles.dayContent}>
        {/* Running Section */}
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>🏃‍♂️ Running</h4>
          <div className={styles.runningInfo}>
            <div className={styles.trackInfo}>
              <a href={entry.running.track.url} target="_blank" rel="noopener noreferrer" className={styles.trackLink}>
                {entry.running.track.name}
              </a>
              <span className={styles.trackLength}>({entry.running.track.length} km)</span>
            </div>
            <div className={styles.runningDetails}>
              <div className={styles.progressInfo}>
                <span className={styles.label}>Progress:</span>
                <span className={styles.progress}>{entry.running.progress}</span>
              </div>
              <div className={styles.performanceInfo}>
                <span className={styles.label}>Performance:</span>
                {renderPerformance(entry.running.performance)}
              </div>
            </div>
          </div>
        </div>

        {/* Workout Section */}
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>💪 Workout</h4>
          {renderWorkout()}
        </div>

        {/* Other Activities Section */}
        <div className={styles.section}>
          <h4 className={styles.sectionTitle}>📊 Other Activities</h4>
          <div className={styles.activitiesGrid}>
            <div className={styles.activityItem}>
              <span className={styles.label}>Stairs:</span>
              {renderStairs()}
            </div>
            <div className={styles.activityItem}>
              <span className={styles.label}>Weight:</span>
              <span className={entry.weight !== 'none' ? styles.weightValue : styles.weightNone}>
                {entry.weight !== 'none' ? `${entry.weight} kg` : 'Not recorded'}
              </span>
            </div>
          </div>
        </div>
      </div>
    </Panel>
  );
};
