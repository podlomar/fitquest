import { Track } from "../../types";
import { getRoutineForDay, weeklyRoutines } from "../../routines";
import { TrackInfo } from "../TrackInfo";
import { ExerciseFields } from "../ExerciseFields";
import { Button } from "../Button";
import styles from "./styles.module.css";

interface Props {
  predefinedTracks: Track[];
}

const getCurrentDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

export const AddEntryForm = ({ predefinedTracks }: Props) => {
  // Get today's routine for initial render
  const today = new Date();
  const todayRoutine = getRoutineForDay(today);
  const initialExercises = todayRoutine ? weeklyRoutines[todayRoutine.id]?.exercises || [] : [];

  return (
    <form id="addEntryForm" className={styles.entryForm} action="/add-entry" method="POST" style={{ display: "none" }}>
      <h2>Add New Fitness Entry</h2>
      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="date">Date:</label>
          <input
            type="date"
            id="date"
            name="date"
            required
            defaultValue={getCurrentDate()}
            hx-get="/api/exercise-fields"
            hx-trigger="change"
            hx-target="#exerciseInputs"
            hx-include="[name='date'], [name='workoutType']"
          />
        </div>
      </div>

      <div className={styles.formSection}>
        <h3>🏃‍♂️ Running</h3>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="selectedTrack">Track:</label>
            <select
              id="selectedTrack"
              name="selectedTrack"
              required
              hx-get="/api/track-info"
              hx-trigger="change"
              hx-target="#trackInfo"
              hx-include="[name='selectedTrack']"
            >
              <option value="">Select a track...</option>
              {predefinedTracks.map((track) => (
                <option key={track.name} value={track.name} data-length={track.length} data-url={track.url}>
                  {track.name} ({track.length} km)
                </option>
              ))}
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="trackProgress">Progress:</label>
            <input type="text" id="trackProgress" name="trackProgress" placeholder="e.g., full, flight 6" required />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label>Track Info:</label>
            <TrackInfo track={null} />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="performance">Performance (1-5):</label>
            <select id="performance" name="performance" defaultValue="2">
              <option value="0">0</option>
              <option value="1">1 ⭐</option>
              <option value="2">2 ⭐⭐</option>
              <option value="3">3 ⭐⭐⭐</option>
              <option value="4">4 ⭐⭐⭐⭐</option>
              <option value="5">5 ⭐⭐⭐⭐⭐</option>
            </select>
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <h3>💪 Workout</h3>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="workoutType">Workout:</label>
            <select
              id="workoutType"
              name="workoutType"
              defaultValue="workout"
              hx-get="/api/exercise-fields"
              hx-trigger="change"
              hx-target="#exerciseInputs"
              hx-include="[name='date'], [name='workoutType']"
            >
              <option value="workout">Workout (based on date)</option>
              <option value="custom">Build your own routine</option>
              <option value="rest">Rest</option>
            </select>
          </div>
        </div>
        <div id="exerciseFields" className={styles.exerciseFields}>
          <div id="exerciseInputs" className={styles.exerciseInputs}>
            <ExerciseFields exerciseIds={initialExercises} />
          </div>
        </div>
      </div>

      <div className={styles.formSection}>
        <h3>🧘‍♀️ Other Activities</h3>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="stretching">Stretching:</label>
            <select id="stretching" name="stretching" defaultValue="true">
              <option value="true">Yes ✓</option>
              <option value="false">No ✗</option>
            </select>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="stairsType">Stairs:</label>
            <select id="stairsType" name="stairsType">
              <option value="data">Stairs Data</option>
              <option value="away">Away</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className={styles.formRow} id="stairsFields">
          <div className={styles.formGroup}>
            <label htmlFor="stairsFloors">Floors:</label>
            <input type="number" id="stairsFloors" name="stairsFloors" min="1" defaultValue="8" />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="stairsTime">Time (mm:ss):</label>
            <input type="text" id="stairsTime" name="stairsTime" placeholder="1:15" pattern="[0-9]+:[0-5][0-9]" />
          </div>
        </div>
        <div className={styles.formRow}>
          <div className={styles.formGroup}>
            <label htmlFor="weight">Weight (kg):</label>
            <input type="number" id="weight" name="weight" step="0.1" min="0" placeholder="70.5" />
          </div>
          <div className={styles.formGroup}>
            <label>&nbsp;</label>
            <small style={{ color: 'var(--text-muted)', marginTop: '5px' }}>Leave empty for 'none'</small>
          </div>
        </div>
      </div>

      <div className={styles.formActions}>
        <Button type="submit" variant="primary" size="md">Save Entry</Button>
        <Button type="button" variant="secondary" size="md">Cancel</Button>
      </div>
    </form>
  );
};
