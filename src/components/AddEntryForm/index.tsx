import { PredefinedTrack } from "../../types";
import { getAllRoutines, getRoutineForDay } from "../../routines";

interface Props {
  predefinedTracks: PredefinedTrack[];
}

export const AddEntryForm = ({ predefinedTracks }: Props) => {
  const allRoutines = getAllRoutines();
  const availableRoutines = allRoutines.filter(routine => !routine.isLegacy);

  return (
    <form id="addEntryForm" className="entry-form" action="/add-entry" method="POST" style={{ display: "none" }}>
      <h2>Add New Fitness Entry</h2>
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
            <select id="selectedTrack" name="selectedTrack" required>
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
            <select id="performance" name="performance" defaultValue="2">
              <option value="none">None</option>
              <option value="1">1 ⭐</option>
              <option value="2">2 ⭐⭐</option>
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
            <label htmlFor="workoutRoutine">Routine:</label>
            <select id="workoutRoutine" name="workoutRoutine">
              <option value="">None (manual entry)</option>
              {availableRoutines.map((routine) => (
                <option key={routine.id} value={routine.id}>
                  {routine.name}: {routine.exercises.map(ex => ex.name).join(', ')}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-row">
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
            <select id="stretching" name="stretching" defaultValue="true">
              <option value="true">Yes ✓</option>
              <option value="false">No ✗</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="stairsType">Stairs:</label>
            <select id="stairsType" name="stairsType">
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
  );
};
