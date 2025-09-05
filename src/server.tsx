import { JSX } from 'react/jsx-runtime';
import express, { Request, Response } from 'express';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { prerenderToNodeStream } from 'react-dom/static';
import { HomePage } from './pages/HomePage/index.js';
import { FitnessEntry, Statistics, Track, ExerciseResult } from './types';
import { weeklyRoutines, getExerciseById, getRoutineForDay, type ExerciseId } from './routines';
import { ExerciseFields } from './components/ExerciseFields/index.js';
import { TrackInfo } from './components/TrackInfo/index.js';
import { renderToStaticMarkup } from 'react-dom/server';

const app = express();
const PORT = process.env.PORT || 3001;

const predefinedTracks: Track[] = [
  {
    name: "Blok",
    length: 1.1,
    url: "https://mapy.com/s/gefabamaja"
  },
  {
    name: "Město",
    length: 2.3,
    url: "https://mapy.com/s/kafolokugu"
  },
  {
    name: "Nuselská",
    length: 4,
    url: "http://example.com/track-a"
  },
  {
    name: "Folimanka",
    length: 6,
    url: "http://example.com/track-a"
  },
  {
    name: "Newton",
    length: 3.7,
    url: "http://example.com/track-a"
  }
];

app.use(express.static('static'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const render = async (component: JSX.Element, res: express.Response) => {
  const { prelude } = await prerenderToNodeStream(component);
  prelude.pipe(res);
};

function loadWeekData(weekFile: string): FitnessEntry[] {
  try {
    const fileContents = fs.readFileSync(`../data/${weekFile}`, 'utf8');
    const data = yaml.load(fileContents) as FitnessEntry[];
    return data || [];
  } catch (e) {
    console.error(`Error loading ${weekFile}:`, e);
    return [];
  }
}

function loadAllData(): FitnessEntry[] {
  try {
    const weekFiles = fs.readdirSync('../data').filter(file => file.startsWith('week-') && file.endsWith('.yml'));
    const allData: FitnessEntry[] = [];

    weekFiles.forEach(weekFile => {
      const weekData = loadWeekData(weekFile);
      allData.push(...weekData);
    });

    // Sort by date (newest first)
    return allData.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (e) {
    console.error('Error loading week data:', e);
    return [];
  }
}

function getAvailableWeeks(): string[] {
  try {
    const weekFiles = fs.readdirSync('../data').filter(file => file.startsWith('week-') && file.endsWith('.yml'));
    return weekFiles.map(file => file.replace('week-', '').replace('.yml', '')).sort().reverse();
  } catch (e) {
    console.error('Error getting available weeks:', e);
    return [];
  }
}

function getCurrentWeek(): string {
  const now = new Date();
  const year = now.getFullYear();
  const weekNumber = getWeekNumber(now);
  return `${weekNumber.toString().padStart(2, '0')}${year % 100}`;
}

function getWeekNumber(date: Date): number {
  const start = new Date(date.getFullYear(), 0, 1);
  const diff = date.getTime() - start.getTime();
  const oneWeek = 1000 * 60 * 60 * 24 * 7;
  return Math.ceil(diff / oneWeek);
}

function saveWeekData(weekFile: string, data: FitnessEntry[]): boolean {
  try {
    const yamlContent = yaml.dump(data, {
      flowLevel: -1,
      indent: 2
    });
    fs.writeFileSync(`../data/${weekFile}`, yamlContent, 'utf8');
    return true;
  } catch (e) {
    console.error(`Error saving ${weekFile}:`, e);
    return false;
  }
}

function addEntryToWeek(entry: FitnessEntry): boolean {
  const entryDate = new Date(entry.date);
  const year = entryDate.getFullYear();
  const weekNumber = getWeekNumber(entryDate);
  const weekId = `${weekNumber.toString().padStart(2, '0')}${year % 100}`;
  const weekFile = `week-${weekId}.yml`;

  const weekData = loadWeekData(weekFile);
  weekData.unshift(entry);

  return saveWeekData(weekFile, weekData);
}

function calculateStats(data: FitnessEntry[]): Statistics {
  const stats: Statistics = {
    totalDays: data.length,
    totalDistance: 0,
    stretchingStreak: 0,
    avgPerformance: 0,
    bestStairsTime: null,
    weight: null
  };

  // Calculate total distance
  const distanceProgressRegex = /([0-9]+) km/;
  data.forEach(entry => {
    const match = entry.running.progress.match(distanceProgressRegex);
    if (match === null) {
      stats.totalDistance += entry.running.track.length;
    } else {
      const distance = parseFloat(match[1]);
      stats.totalDistance += distance;
    }
  });

  stats.totalDistance = Math.round(stats.totalDistance * 10) / 10; // Round to one decimal place

  // Calculate stretching streak (from most recent)
  for (let i = 0; i < data.length; i++) {
    if (data[i].stretching) {
      stats.stretchingStreak++;
    } else {
      break;
    }
  }

  // Calculate average performance
  let totalPerformance = 0;
  let performanceCount = 0;
  data.forEach(entry => {
    if (entry.running?.performance && entry.running.performance !== 'none') {
      totalPerformance += entry.running.performance as number;
      performanceCount++;
    }
  });

  if (performanceCount > 0) {
    stats.avgPerformance = Math.round((totalPerformance / performanceCount) * 10) / 10;
  }

  // Find best time for 8 flights of stairs
  let bestTimeInSeconds: number | null = null;
  data.forEach(entry => {
    if (entry.stairs && typeof entry.stairs === 'object' && 'floors' in entry.stairs && entry.stairs.floors === 8 && entry.stairs.time) {
      const timeStr = entry.stairs.time;
      // Parse time format like "1:15" to seconds
      const timeParts = timeStr.split(':');
      if (timeParts.length === 2) {
        const minutes = parseInt(timeParts[0]);
        const seconds = parseInt(timeParts[1]);
        const totalSeconds = minutes * 60 + seconds;

        if (bestTimeInSeconds === null || totalSeconds < bestTimeInSeconds) {
          bestTimeInSeconds = totalSeconds;
        }
      }
    }
  });

  if (bestTimeInSeconds !== null) {
    const minutes = Math.floor(bestTimeInSeconds / 60);
    const seconds = bestTimeInSeconds % 60;
    stats.bestStairsTime = `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  // Find avarage weight for last seven entries
  let weightSum: number = 0;
  let weightCount: number = 0;

  for (const entry of data.slice(0, 7)) {
    if (entry.weight !== 'none') {
      weightSum += entry.weight;
      weightCount++;
    }
  }

  if (weightCount > 0) {
    stats.weight = Math.round((weightSum / weightCount) * 10) / 10;
  }

  return stats;
}

// API endpoint for dynamic exercise fields
app.get('/api/exercise-fields', (req: Request, res: Response) => {
  const { date, workoutType } = req.query;

  // If rest is selected, return empty
  if (workoutType === 'rest') {
    res.send('');
    return;
  }

  // Get routine based on date
  const selectedDate = date ? new Date(date as string) : new Date();
  const routine = getRoutineForDay(selectedDate);

  if (!routine) {
    res.send('');
    return;
  }

  const routineDetails = weeklyRoutines[routine.id];
  if (!routineDetails) {
    res.send('');
    return;
  }

  const html = renderToStaticMarkup(
    <ExerciseFields exerciseIds={routineDetails.exercises} />
  );

  res.send(html);
});

app.get('/api/track-info', (req: Request, res: Response) => {
  const { selectedTrack } = req.query;

  if (!selectedTrack) {
    res.send('');
    return;
  }

  const track = predefinedTracks.find(t => t.name === selectedTrack);
  if (!track) {
    res.send('');
    return;
  }

  const html = renderToStaticMarkup(
    <TrackInfo track={track} />
  );

  res.send(html);
});

app.get('/', (req: Request, res: Response) => {
  const allData = loadAllData();
  const stats = calculateStats(allData);

  const availableWeeks = getAvailableWeeks();
  const selectedWeek = req.query.week as string || getCurrentWeek();
  const weekData = loadWeekData(`week-${selectedWeek}.yml`);

  const success = req.query.success === '1';
  const error = req.query.error === '1';
  render(
    <HomePage
      alert={success ? 'success' : error ? 'error' : null}
      data={weekData}
      stats={stats}
      predefinedTracks={predefinedTracks}
      availableWeeks={availableWeeks}
      selectedWeek={selectedWeek}
    />,
    res,
  );
});

app.post('/add-entry', (req: Request, res: Response) => {
  try {
    const {
      date,
      selectedTrack,
      trackProgress,
      performance,
      workoutType,
      exercises,
      stretching,
      stairsType,
      stairsFloors,
      stairsTime,
      weight
    } = req.body;

    const predefinedTrack = predefinedTracks.find(track => track.name === selectedTrack);
    if (!predefinedTrack) {
      throw new Error('Invalid track selection');
    }

    const newEntry: FitnessEntry = {
      date: date || new Date().toISOString().split('T')[0],
      running: {
        track: {
          name: predefinedTrack.name,
          length: predefinedTrack.length,
          url: predefinedTrack.url
        },
        progress: trackProgress || '',
        performance: performance === 'none' ? 'none' : parseInt(performance) || 1
      },
      workout: workoutType === 'rest' ? 'rest' : (() => {
        // Get routine based on the entry date
        const entryDate = new Date(date || new Date().toISOString().split('T')[0]);
        const routine = getRoutineForDay(entryDate);
        return {
          routine: routine?.id || '',
          results: exercises ?
            (() => {
              const results: ExerciseResult[] = [];
              Object.keys(exercises).forEach(exerciseId => {
                const exercise = exercises[exerciseId];

                // Create the appropriate result type based on what's provided
                if (exercise.reps) {
                  results.push({
                    id: exerciseId as ExerciseId,
                    reps: exercise.reps
                  });
                } else if (exercise.holds) {
                  results.push({
                    id: exerciseId as ExerciseId,
                    holds: exercise.holds
                  });
                }
              });
              return results;
            })() :
            [] // Empty array for non-structured content
        };
      })(),
      stretching: stretching === 'true',
      stairs: stairsType === 'away' ? 'away' :
        stairsType === 'none' ? 'none' :
          {
            floors: parseInt(stairsFloors) || 8,
            time: stairsTime || ''
          },
      weight: weight === 'none' || weight === '' ? 'none' : parseFloat(weight) || 'none'
    };

    if (addEntryToWeek(newEntry)) {
      res.redirect('/?success=1');
    } else {
      res.redirect('/?error=1');
    }
  } catch (error) {
    console.error('Error adding entry:', error);
    res.redirect('/?error=1');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
