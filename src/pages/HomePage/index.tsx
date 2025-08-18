import { FitnessEntry, PredefinedTrack, Statistics } from "../../types";

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
  alert: 'success' | 'error' | null;
  stats: Statistics;
  data: FitnessEntry[];
  predefinedTracks: PredefinedTrack[];
}

export const HomePage = ({ alert, stats, data, predefinedTracks }: Props) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Fitness Tracker</title>
        <link rel="stylesheet" href="/styles.css" />
      </head>

      <body>
        <div className="container">
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

          <div id="addEntryForm" className="form-container" style={{ display: "none" }}>
            <div className="form-wrapper">
              <h2>Add New Fitness Entry</h2>
              <form action="/add-entry" method="POST">
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="date">Date:</label>
                    <input type="date" id="date" name="date" required />
                  </div>
                </div>

                <div className="form-section">
                  <h3>🏃‍♂️ Running</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="selectedTrack">Track:</label>
                      <select id="selectedTrack" name="selectedTrack" required onChange="updateTrackInfo()">
                        <option value="">Select a track...</option>
                        {predefinedTracks.map((track) => (
                          <option key={track.name} value={track.name} data-length={track.length} data-url={track.url}>
                            {track.name} ({track.length} km)
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="trackProgress">Progress:</label>
                      <input type="text" id="trackProgress" name="trackProgress" placeholder="e.g., full, flight 6" required />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group track-info">
                      <label>Track Info:</label>
                      <div id="trackInfoDisplay" className="track-info-display">
                        <span id="trackLength">Select a track to see details</span>
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="performance">Performance (1-5):</label>
                      <select id="performance" name="performance">
                        <option value="none">None</option>
                        <option value="1">1 ⭐</option>
                        <option value="2" selected>2 ⭐⭐</option>
                        <option value="3">3 ⭐⭐⭐</option>
                        <option value="4">4 ⭐⭐⭐⭐</option>
                        <option value="5">5 ⭐⭐⭐⭐⭐</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>💪 Workout</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="workoutLevel">Level:</label>
                      <select id="workoutLevel" name="workoutLevel">
                        <option value="low">Low</option>
                        <option value="mid" selected>Mid</option>
                        <option value="high">High</option>
                        <option value="base">Base</option>
                        <option value="off">Off</option>
                        <option value="rest">Rest</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="workoutContent">Content:</label>
                      <input type="text" id="workoutContent" name="workoutContent" placeholder="e.g., 12d 8k" />
                    </div>
                  </div>
                </div>

                <div className="form-section">
                  <h3>🧘‍♀️ Other Activities</h3>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="stretching">Stretching:</label>
                      <select id="stretching" name="stretching">
                        <option value="true" selected>Yes ✓</option>
                        <option value="false">No ✗</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="stairsType">Stairs:</label>
                      <select id="stairsType" name="stairsType" onChange="toggleStairsFields()">
                        <option value="data">Stairs Data</option>
                        <option value="away">Away</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="form-row" id="stairsFields">
                    <div className="form-group">
                      <label htmlFor="stairsFloors">Floors:</label>
                      <input type="number" id="stairsFloors" name="stairsFloors" min="1" value="8" />
                    </div>
                    <div className="form-group">
                      <label htmlFor="stairsTime">Time (mm:ss):</label>
                      <input type="text" id="stairsTime" name="stairsTime" placeholder="1:15" pattern="[0-9]+:[0-5][0-9]" />
                    </div>
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="weight">Weight (kg):</label>
                      <input type="number" id="weight" name="weight" step="0.1" min="0" placeholder="70.5" />
                    </div>
                    <div className="form-group">
                      <label>&nbsp;</label>
                      <small style={{ color: 'var(--text-muted)', marginTop: '5px' }}>Leave empty for 'none'</small>
                    </div>
                  </div>
                </div>

                <div className="form-actions">
                  <button type="submit" className="submit-btn">Save Entry</button>
                  <button type="button" id="cancelBtn" className="cancel-btn">Cancel</button>
                </div>
              </form>
            </div>
          </div>

          <main>
            <div className="summary-section">
              <div className="summary-cards">
                <div className="summary-card">
                  <div className="summary-icon">📅</div>
                  <div className="summary-content">
                    <div className="summary-number">{stats.totalDays}</div>
                    <div className="summary-label">Total Days</div>
                  </div>
                </div>

                <div className="summary-card">
                  <div className="summary-icon">🏃‍♂️</div>
                  <div className="summary-content">
                    <div className="summary-number">{stats.totalDistance} km</div>
                    <div className="summary-label">Total Distance</div>
                  </div>
                </div>

                <div className="summary-card">
                  <div className="summary-icon">🧘‍♀️</div>
                  <div className="summary-content">
                    <div className="summary-number">{stats.stretchingStreak}</div>
                    <div className="summary-label">Stretching Streak</div>
                  </div>
                </div>

                <div className="summary-card">
                  <div className="summary-icon">⭐</div>
                  <div className="summary-content">
                    <div className="summary-number">{stats.avgPerformance > 0 ? stats.avgPerformance : '-'}</div>
                    <div className="summary-label">Avg Performance</div>
                  </div>
                </div>

                <div className="summary-card">
                  <div className="summary-icon">🏃‍♀️</div>
                  <div className="summary-content">
                    <div className="summary-number">{stats.bestStairsTime ? stats.bestStairsTime : '-'}</div>
                    <div className="summary-label">Best 8 Flights</div>
                  </div>
                </div>

                <div className="summary-card">
                  <div className="summary-icon">⚖️</div>
                  <div className="summary-content">
                    <div className="summary-number">{stats.currentWeight ? stats.currentWeight : '-'} kg</div>
                    <div className="summary-label">Current Weight</div>
                  </div>
                </div>

                <div className="summary-card">
                  <div className="summary-icon">📈</div>
                  <div className="summary-content">
                    <div className="summary-number">
                      {stats.weightChange ? `${stats.weightChange > 0 ? '+' : ''}${stats.weightChange} kg` : '-'}
                    </div>
                    <div className="summary-label">Weight Change</div>
                  </div>
                </div>
              </div>
            </div>

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

            {data.length === 0 ? (
              <div className="no-data">
                <p>No fitness data available</p>
              </div>
            ) : null}
          </main>

          <footer>
            <p>Keep up the great work! 💪</p>
          </footer>
        </div>
      </body>
    </html>
  );
};
