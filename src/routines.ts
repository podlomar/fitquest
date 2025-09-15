export interface Exercise {
  id: string;
  usage: 'legacy' | 'active';
  name: string;
  execution: 'reps' | 'holds';
  goal?: string;
}

export const exercises: Record<string, Exercise> = {
  squats: {
    id: 'squats',
    usage: 'active',
    name: 'Squats',
    execution: 'reps',
    goal: '3x35'
  },
  kneePushUps: {
    id: 'kneePushUps',
    usage: 'active',
    name: 'Knee Push Ups',
    execution: 'reps',
    goal: '3x12'
  },
  ringRows: {
    id: 'ringRows',
    usage: 'active',
    name: 'Ring Rows',
    execution: 'reps',
    goal: '3x12'
  },
  frontPlank: {
    id: 'frontPlank',
    usage: 'active',
    name: 'Front Plank',
    execution: 'holds',
    goal: '3m'
  },
  gluteBridges: {
    id: 'gluteBridges',
    usage: 'active',
    name: 'Glute Bridges',
    execution: 'reps'
  },
  sidePlanks: {
    id: 'sidePlanks',
    usage: 'active',
    name: 'Side Planks',
    execution: 'holds'
  },
  barHang: {
    id: 'barHang',
    usage: 'active',
    name: 'Bar Hang',
    execution: 'holds',
    goal: '90s'
  },
  frontPlanks: {
    id: 'frontPlanks',
    usage: 'legacy',
    name: 'Front Planks',
    execution: 'holds'
  },
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
    name: 'Friday: Legs + Pull',
    exercises: ['squats', 'ringRows', 'frontPlank', 'barHang']
  },
  saturday: {
    id: 'saturday',
    name: 'Saturday: Push + Glutes',
    exercises: ['kneePushUps', 'gluteBridges', 'frontPlank', 'barHang']
  },
  sunday: {
    id: 'rest',
    name: 'Recovery',
    exercises: []
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
  return Object.values(exercises).filter(ex => ex.usage === 'active');
};

export const getExercisesByIds = (ids: string[]): Exercise[] => {
  return ids.map(id => exercises[id]).filter(Boolean);
};
