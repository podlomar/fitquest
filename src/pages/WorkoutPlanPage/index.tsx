import { Layout } from "../../components/Layout";
import { Header } from "../../components/Header";
import { Footer } from "../../components/Footer";
import { Panel } from "../../components/Panel";
import { weeklyRoutines, getSelectableRoutines, getExerciseById, type Exercise } from "../../routines";
import styles from './styles.module.css';

interface Props {
  alert: 'success' | 'error' | null;
}

export const WorkoutPlanPage = ({ alert }: Props) => {
  const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const routineKeys = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];

  return (
    <Layout>
      <div className={styles.container}>
        <Header alert={alert} />

        <main>
          <Panel>
            <div className={styles.pageHeader}>
              <h1 className={styles.pageTitle}>💪 Weekly Workout Plan</h1>
              <p className={styles.pageDescription}>Your structured fitness routine for each day</p>
            </div>
          </Panel>

          <div className={styles.weeklyPlan}>
            {dayNames.map((dayName, index) => {
              const routineKey = routineKeys[index];
              const routine = weeklyRoutines[routineKey];

              return (
                <Panel key={dayName}>
                  <div className={styles.dayHeader}>
                    <h3 className={styles.dayName}>{dayName}</h3>
                    <span className={styles.routineName}>{routine?.name || 'Rest Day'}</span>
                  </div>

                  {routine && routine.exercises?.length > 0 ? (
                    <div className={styles.exerciseList}>
                      {routine.exercises.map((exerciseId) => {
                        const exercise = getExerciseById(exerciseId);
                        if (!exercise) return null;

                        return (
                          <div key={exerciseId} className={styles.exerciseItem}>
                            <span className={styles.exerciseName}>{exercise.name}</span>
                            <span className={styles.exerciseType}>
                              {exercise.execution === 'reps' ? '🔢 Reps' : '⏱️ Hold'}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className={styles.restDay}>
                      <span className={styles.restIcon}>😴</span>
                      <span className={styles.restText}>Rest & Recovery</span>
                    </div>
                  )}
                </Panel>
              );
            })}
          </div>

          <Panel>
            <div className={styles.exerciseReference}>
              <h2 className={styles.referenceTitle}>Exercise Reference</h2>
              <div className={styles.exerciseGrid}>
                {(() => {
                  const uniqueExercises: Exercise[] = [];
                  getSelectableRoutines().forEach(routine => {
                    routine.exercises.forEach(exerciseId => {
                      const exercise = getExerciseById(exerciseId);
                      if (exercise && !uniqueExercises.find(ex => ex.id === exerciseId)) {
                        uniqueExercises.push(exercise);
                      }
                    });
                  });
                  return uniqueExercises;
                })().map((exercise) => (
                  <div key={exercise.id} className={styles.exerciseCard}>
                    <h4 className={styles.exerciseCardName}>{exercise.name}</h4>
                    <span className={styles.exerciseCardType}>
                      {exercise.execution === 'reps' ? '🔢 Count repetitions' : '⏱️ Hold position'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Panel>
        </main>

        <Footer />
      </div>
    </Layout>
  );
};
