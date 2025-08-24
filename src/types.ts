import type { ExerciseId } from "./routines";

export interface Track {
  name: string;
  length: number;
  progress: string;
  url: string;
}

export interface PredefinedTrack {
  name: string;
  length: number;
  url: string;
}

export interface Running {
  track: Track;
  performance: number | 'none';
}

export interface RepsResult {
  id: ExerciseId;
  reps: string;
}

export interface HoldsResult {
  id: ExerciseId;
  holds: string;
}

export type ExerciseResult = RepsResult | HoldsResult;

export interface Workout {
  routine: string;
  results: ExerciseResult[];
}

export interface StairsData {
  floors: number;
  time: string;
}

export interface FitnessEntry {
  date: string;
  running: Running;
  workout: Workout | 'rest';
  stretching: boolean;
  stairs: StairsData | 'away' | 'none';
  weight: number | 'none';
}

export interface Statistics {
  totalDays: number;
  totalDistance: number;
  stretchingStreak: number;
  avgPerformance: number;
  bestStairsTime: string | null;
  weight: number | null;
}
