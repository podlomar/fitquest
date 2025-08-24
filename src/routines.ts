export interface Exercise {
  id: string;
  name: string;
  execution: 'reps' | 'holds';
}

export const exerciseIds = [
  'squats',
  'kneePushUps',
  'ringRows',
  'frontPlanks',
  'gluteBridges',
  'sidePlanks'
] as const;

export type ExerciseId = typeof exerciseIds[number];

export const exercises: Record<ExerciseId, Exercise> = {
  squats: {
    id: 'squats',
    name: 'Squats',
    execution: 'reps'
  },
  kneePushUps: {
    id: 'kneePushUps',
    name: 'Knee Push Ups',
    execution: 'reps'
  },
  ringRows: {
    id: 'ringRows',
    name: 'Ring Rows',
    execution: 'reps'
  },
  frontPlanks: {
    id: 'frontPlanks',
    name: 'Front Planks',
    execution: 'holds'
  },
  gluteBridges: {
    id: 'gluteBridges',
    name: 'Glute Bridges',
    execution: 'reps'
  },
  sidePlanks: {
    id: 'sidePlanks',
    name: 'Side Planks',
    execution: 'holds'
  }
};

export const getExerciseById = (id: ExerciseId): Exercise => {
  return exercises[id];
};

export interface Routine {
  id: string;
  name: string;
  exercises: ExerciseId[];
}

export const weeklyRoutines: Record<string, Routine> = {
  monday: {
    id: 'monday',
    name: 'Monday',
    exercises: ['squats', 'kneePushUps']
  },
  tuesday: {
    id: 'tuesday',
    name: 'Tuesday',
    exercises: ['ringRows', 'frontPlanks']
  },
  wednesday: {
    id: 'wednesday',
    name: 'Wednesday',
    exercises: ['squats', 'gluteBridges']
  },
  thursday: {
    id: 'thursday',
    name: 'Thursday',
    exercises: ['kneePushUps', 'sidePlanks']
  },
  friday: {
    id: 'friday',
    name: 'Friday',
    exercises: ['ringRows', 'squats']
  },
  saturday: {
    id: 'saturday',
    name: 'Saturday',
    exercises: ['kneePushUps', 'gluteBridges']
  },
  legacy: {
    id: 'legacy',
    name: 'Legacy Routine',
    exercises: ['squats', 'kneePushUps', 'ringRows']
  },
};

export const getSelectableRoutines = (): Routine[] => {
  return Object.values(weeklyRoutines).filter(
    (routine) => routine.id !== 'legacy'
  );
};

export const getRoutineForDay = (date: Date): Routine => {
  const dayNames = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'];
  const dayName = dayNames[date.getDay()];
  return weeklyRoutines[dayName];
};
