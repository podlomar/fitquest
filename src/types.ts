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

export interface Exercise {
  name: string;
  reps?: string;
}

export interface Routine {
  id: string;
  name: string;
  exercises: Exercise[];
  isLegacy?: boolean;
}

export interface Workout {
  routine: string;
  content: string;
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
  currentWeight: number | null;
  weightChange: number | null;
}
