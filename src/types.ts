export interface Track {
  name: string;
  length: number;
  url: string;
  progressUnit: string;
}

export interface Running {
  track: Track;
  progress: number;
  performance: number | 'none';
}

export interface RepsResult {
  id: string;
  reps: string;
}

export interface HoldsResult {
  id: string;
  holds: string;
}

export type ExerciseResult = RepsResult | HoldsResult;

export type WorkoutType = 'date-based' | 'custom' | 'rest';

export interface PredefinedWorkout {
  type: 'predefined';
  routine: string;
  results: ExerciseResult[];
}

export interface CustomWorkout {
  type: 'custom';
  routine: 'Custom Routine';
  exercises: string[];
  results: ExerciseResult[];
}

export type Workout = PredefinedWorkout | CustomWorkout;

export interface StairsData {
  floors: number;
  time: string;
}

export interface FitnessEntry {
  date: string;
  running: Running | 'rest';
  workout: Workout | 'rest';
  stretching: boolean;
  stairs: StairsData | 'away' | 'none';
  weight: number | 'none';
  diary?: string;
}

export interface Statistics {
  totalDays: number;
  totalDistance: number;
  stretchingStreak: number;
  avgPerformance: number;
  bestStairsTime: string | null;
  weight: number | null;
}

// Helper functions for workout types
export const createPredefinedWorkout = (routine: string, results: ExerciseResult[]): PredefinedWorkout => ({
  type: 'predefined',
  routine,
  results
});

export const createCustomWorkout = (exercises: string[], results: ExerciseResult[]): CustomWorkout => ({
  type: 'custom',
  routine: 'Custom Routine',
  exercises,
  results
});

export const isCustomWorkout = (workout: Workout): workout is CustomWorkout => {
  return workout.type === 'custom';
};

export const isPredefinedWorkout = (workout: Workout): workout is PredefinedWorkout => {
  return workout.type === 'predefined';
};
