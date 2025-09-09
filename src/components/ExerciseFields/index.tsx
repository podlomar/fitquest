import { getAllExercises } from "../../routines";
import styles from "./styles.module.css";

interface Props {
  exerciseIds: string[];
  title?: string;
}

export const ExerciseFields = ({ exerciseIds, title = "Exercise Details" }: Props) => {
  if (exerciseIds.length === 0) {
    return null;
  }

  const allExercises = getAllExercises();
  const exercises = exerciseIds.map(
    id => allExercises.find(ex => ex.id === id)!
  );

  return (
    <>
      <h4 className={styles.title}>{title}</h4>
      {exercises.map(exercise => {
        const isHolds = exercise.execution === 'holds';

        return (
          <div key={exercise.id} className={styles.exerciseInputGroup}>
            <h5 className={styles.exerciseName}>{exercise.name}</h5>
            <div className={styles.exerciseDetails}>
              <div className={styles.formGroup}>
                <label htmlFor={`${exercise.id}_${exercise.execution}`}>
                  {isHolds ? 'Holds' : 'Reps'}:
                </label>
                <input
                  type="text"
                  id={`${exercise.id}_${exercise.execution}`}
                  name={`exercises[${exercise.id}][${exercise.execution}]`}
                  placeholder={isHolds ? 'e.g., 30s' : 'e.g., 10+10+8'}
                />
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};
