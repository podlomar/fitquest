import { FitnessEntry } from "../../types";

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
      <div className="no-data">
        <p>No fitness data available</p>
      </div>
    );
  }

  return (
    <div className="table-wrapper">
      <table className="fitness-table">
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
                {entry.running && entry.running.track ? (
                  entry.running.track.url ? (
                    <a href={entry.running.track.url} target="_blank" className="track-link">
                      {entry.running.track.name} ({entry.running.track.length} km)
                    </a>
                  ) : (
                    entry.running.track.name
                  )
                ) : (
                  "-"
                )}
              </td>
              <td data-label="Progress">
                {entry.running && entry.running.track && entry.running.track.progress ? (
                  <span className="progress">
                    {entry.running.track.progress}
                  </span>
                ) : (
                  "-"
                )}
              </td>
              <td data-label="Performance">
                {entry.running && entry.running.performance && entry.running.performance !== 'none' ? (
                  <div className="performance-rating">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span key={i} className={`star ${i < entry.running.performance ? 'filled' : ''}`}>★</span>
                    ))}
                  </div>
                ) : (
                  <span className="performance-none">-</span>
                )}
              </td>
              <td data-label="Workout">
                {entry.workout ? (
                  entry.workout === 'rest' ? (
                    <span className="workout-rest">Rest</span>
                  ) : (
                    <div className="workout-info">
                      <span className="level level-{entry.workout.level}">
                        {entry.workout.level}
                      </span>
                      {entry.workout.content && (
                        <div className="workout-content">
                          {entry.workout.content}
                        </div>
                      )}
                    </div>
                  )
                ) : (
                  "-"
                )}
              </td>
              <td data-label="Stretching">
                <span className={`status ${entry.stretching ? 'yes' : 'no'}`}>
                  {entry.stretching ? '✓' : '✗'}
                </span>
              </td>
              <td data-label="Stairs">
                {entry.stairs ? (
                  entry.stairs === 'away' ? (
                    <span className="stairs-away">Away</span>
                  ) : entry.stairs === 'none' ? (
                    <span className="stairs-none">-</span>
                  ) : entry.stairs.floors ? (
                    <div className="stairs-info">
                      <span className="stairs-floors">{entry.stairs.floors} floors</span>
                      {entry.stairs.time && (
                        <span className="stairs-time">{entry.stairs.time}</span>
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
                  <span className="weight">{entry.weight} kg</span>
                ) : (
                  <span className="weight-none">-</span>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
