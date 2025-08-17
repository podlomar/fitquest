export interface Track {
  name: string;
  length: number;
  progress: string;
  url: string;
}

export interface Running {
  track: Track;
  performance: number | 'none';
}

export interface Workout {
  level: 'low' | 'mid' | 'high' | 'base' | 'off';
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
}

export interface Statistics {
  totalDays: number;
  totalDistance: number;
  stretchingStreak: number;
  avgPerformance: number;
  bestStairsTime: string | null;
}
