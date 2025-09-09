export interface Exercise {
  id: string;
  name: string;
  execution: 'reps' | 'holds';
}

export const exercises: Record<string, Exercise> = {
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
  frontPlank: {
    id: 'frontPlank',
    name: 'Front Plank',
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
  },
  barHang: {
    id: 'barHang',
    name: 'Bar Hang',
    execution: 'holds'
  }
};

export interface HoldExerciseStats {
  holdTimes: number[];
  bestHold: number;
}

export interface RepsExerciseStats {
  repCounts: number[];
  maxReps: number;
}

export type ExerciseStats = HoldExerciseStats | RepsExerciseStats;

export const getExerciseById = (id: string): Exercise | null => {
  return exercises[id] ?? null;
};

export interface Routine {
  id: string;
  name: string;
  exercises: string[];
}

export const weeklyRoutines: Record<string, Routine> = {
  monday: {
    id: 'monday',
    name: 'Monday: Legs + Push',
    exercises: ['squats', 'kneePushUps', 'frontPlank', 'barHang'],
  },
  tuesday: {
    id: 'tuesday',
    name: 'Tuesday: Pull + Core',
    exercises: ['ringRows', 'sidePlanks', 'frontPlank', 'barHang'],
  },
  wednesday: {
    id: 'wednesday',
    name: 'Wednesday: Legs + Glutes',
    exercises: ['squats', 'gluteBridges', 'frontPlank', 'barHang'],
  },
  thursday: {
    id: 'thursday',
    name: 'Thursday: Push + Core',
    exercises: ['kneePushUps', 'sidePlanks', 'frontPlank', 'barHang']
  },
  friday: {
    id: 'friday',
    name: 'Friday: Pull + Legs',
    exercises: ['ringRows', 'squats', 'frontPlank', 'barHang']
  },
  saturday: {
    id: 'saturday',
    name: 'Saturday: Push + Glutes',
    exercises: ['kneePushUps', 'gluteBridges', 'frontPlank', 'barHang']
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

export const getAllExercises = (): Exercise[] => {
  return Object.values(exercises);
};

export const getExercisesByIds = (ids: string[]): Exercise[] => {
  return ids.map(id => exercises[id]).filter(Boolean);
};
