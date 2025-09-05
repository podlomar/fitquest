import { FitnessEntry } from "../../types";
import { getExerciseById } from "../../routines";
import styles from "./styles.module.css";

const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  const czechDays = ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'];
  const czechMonths = ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'];

  const dayName = czechDays[date.getDay()];
  const day = date.getDate().toString();
  const monthName = czechMonths[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);

  return `${dayName} ${day}. ${monthName} ${year}`;
};

interface Props {
  data: FitnessEntry[];
}

export const FitnessTable = ({ data }: Props) => {
  if (data.length === 0) {
    return (
      <div className={styles.noData}>
        <p>No fitness data available</p>
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.fitnessTable}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Track</th>
            <th>Progress</th>
            <th>Performance</th>
            <th>Workout</th>
            <th>Stretching</th>
            <th>Stairs</th>
            <th>Weight</th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr key={entry.date}>
              <td data-label="Date">
                {formatDate(entry.date)}
              </td>
              <td data-label="Track">
                <a href={entry.running.track.url} target="_blank" className={styles.trackLink}>
                  {entry.running.track.name} ({entry.running.track.length} km)
                </a>
              </td>
              <td data-label="Progress">
                <span className={styles.progress}>
                  {entry.running.progress}
                </span>
              </td>
              <td data-label="Performance">
                {entry.running.performance !== 'none' ? (
                  <div className={styles.performanceRating}>
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={`${styles.star} ${i < Number(entry.running.performance) ? styles.filled : ''}`}>★</span>
                    ))}
                  </div>
                ) : (
                  <span className={styles.performanceNone}>-</span>
                )}
              </td>
              <td data-label="Workout">
                {entry.workout ? (
                  entry.workout === 'rest' ? (
                    <span className={styles.workoutRest}>Rest</span>
                  ) : (
                    <div className={styles.workoutInfo}>
                      <div className={styles.workoutRoutine}>
                        {entry.workout.routine}
                        {entry.workout.type === 'custom' && (
                          <span className={styles.customWorkoutLabel}> (Custom)</span>
                        )}
                      </div>
                      <div className={styles.workoutContent}>
                        <div className={styles.structuredContent}>
                          {entry.workout.results.map((result) => (
                            <div key={result.id} className={styles.exerciseDetail}>
                              <span className={styles.exerciseName}>
                                {getExerciseById(result.id).name}:
                              </span>
                              <span className={styles.exerciseValues}>
                                {'reps' in result ? (
                                  <span className={styles.exerciseMetric}>
                                    reps: {result.reps}
                                  </span>
                                ) : null}
                                {'holds' in result ? (
                                  <span className={styles.exerciseMetric}>
                                    holds: {result.holds}
                                  </span>
                                ) : null}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  "-"
                )}
              </td>
              <td data-label="Stretching">
                <span className={`${styles.status} ${entry.stretching ? styles.yes : styles.no}`}>
                  {entry.stretching ? '✓' : '✗'}
                </span>
              </td>
              <td data-label="Stairs">
                {entry.stairs ? (
                  entry.stairs === 'away' ? (
                    <span className={styles.stairsAway}>Away</span>
                  ) : entry.stairs === 'none' ? (
                    <span className={styles.stairsNone}>-</span>
                  ) : entry.stairs.floors ? (
                    <div className={styles.stairsInfo}>
                      <span className={styles.stairsFloors}>{entry.stairs.floors} floors</span>
                      {entry.stairs.time && (
                        <span className={styles.stairsTime}>{entry.stairs.time}</span>
                      )}
                    </div>
                  ) : (
                    "unknown"
                  )
                ) : (
                  "-"
                )}
              </td>
              <td data-label="Weight">
                {entry.weight && entry.weight !== 'none' ? (
                  <span className={styles.weight}>{entry.weight} kg</span>
                ) : (
                  <span className={styles.weightNone}>-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
