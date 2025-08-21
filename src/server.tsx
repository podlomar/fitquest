import { JSX } from 'react/jsx-runtime';
import express, { Request, Response } from 'express';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { prerenderToNodeStream } from 'react-dom/static';
import { HomePage } from './pages/HomePage';
import { FitnessEntry, Statistics, PredefinedTrack } from './types';

const app = express();
const PORT = process.env.PORT || 3001;

const predefinedTracks: PredefinedTrack[] = [
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

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const render = async (component: JSX.Element, res: express.Response) => {
  const { prelude } = await prerenderToNodeStream(component);
  prelude.pipe(res);
};

function loadData(): FitnessEntry[] {
  try {
    const fileContents = fs.readFileSync('./data.yml', 'utf8');
    const data = yaml.load(fileContents) as FitnessEntry[];
    return data || [];
  } catch (e) {
    console.error('Error loading data.yml:', e);
    return [];
  }
}

function saveData(data: FitnessEntry[]): boolean {
  try {
    const yamlContent = yaml.dump(data, {
      flowLevel: -1,
      indent: 2
    });
    fs.writeFileSync('./data.yml', yamlContent, 'utf8');
    return true;
  } catch (e) {
    console.error('Error saving data.yml:', e);
    return false;
  }
}

function calculateStats(data: FitnessEntry[]): Statistics {
  const stats: Statistics = {
    totalDays: data.length,
    totalDistance: 0,
    stretchingStreak: 0,
    avgPerformance: 0,
    bestStairsTime: null,
    currentWeight: null,
    weightChange: null
  };

  // Calculate total distance
  data.forEach(entry => {
    if (entry.running?.track?.length) {
      stats.totalDistance += entry.running.track.length;
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

  // Calculate weight statistics
  // Find current weight (most recent non-'none' weight)
  let currentWeight: number | null = null;
  let previousWeight: number | null = null;
  let foundCurrent = false;

  for (const entry of data) {
    if (entry.weight && entry.weight !== 'none') {
      if (!foundCurrent) {
        currentWeight = entry.weight as number;
        foundCurrent = true;
      } else {
        previousWeight = entry.weight as number;
        break;
      }
    }
  }

  stats.currentWeight = currentWeight;
  if (currentWeight !== null && previousWeight !== null) {
    stats.weightChange = Math.round((currentWeight - previousWeight) * 10) / 10;
  }

  return stats;
}

app.get('/', (req: Request, res: Response) => {
  const data = loadData();
  const stats = calculateStats(data);
  const success = req.query.success === '1';
  const error = req.query.error === '1';
  render(
    <HomePage
      alert={success ? 'success' : error ? 'error' : null}
      data={data}
      stats={stats}
      predefinedTracks={predefinedTracks}
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
      workoutRoutine,
      workoutLevel,
      workoutContent,
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
          progress: trackProgress || '',
          url: predefinedTrack.url
        },
        performance: performance === 'none' ? 'none' : parseInt(performance) || 1
      },
      workout: workoutLevel === 'rest' ? 'rest' : {
        routine: workoutRoutine || undefined,
        level: workoutLevel as 'low' | 'mid' | 'high' | 'base' | 'off',
        content: workoutContent || ''
      },
      stretching: stretching === 'true',
      stairs: stairsType === 'away' ? 'away' :
        stairsType === 'none' ? 'none' :
          {
            floors: parseInt(stairsFloors) || 8,
            time: stairsTime || ''
          },
      weight: weight === 'none' || weight === '' ? 'none' : parseFloat(weight) || 'none'
    };

    const data = loadData();
    data.unshift(newEntry);

    if (saveData(data)) {
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
