import express, { Request, Response } from 'express';
import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as nunjucks from 'nunjucks';
import { FitnessEntry, Statistics } from './types';

const app = express();
const PORT = process.env.PORT || 3001;

// Serve static files from public directory
app.use(express.static('public'));

// Set up Nunjucks as template engine
const nunjucksEnv = nunjucks.configure('views', {
  autoescape: true,
  express: app
});

// Add custom date filter
nunjucksEnv.addFilter('formatDate', function (dateStr: string): string {
  const date = new Date(dateStr);
  const czechDays = ['ne', 'po', 'út', 'st', 'čt', 'pá', 'so'];
  const czechMonths = ['led', 'úno', 'bře', 'dub', 'kvě', 'čvn', 'čvc', 'srp', 'zář', 'říj', 'lis', 'pro'];

  const dayName = czechDays[date.getDay()];
  const day = date.getDate().toString();
  const monthName = czechMonths[date.getMonth()];
  const year = date.getFullYear().toString().slice(-2);

  return `${dayName} ${day}. ${monthName} ${year}`;
});

app.set('view engine', 'njk');

// Load and parse YAML data
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

// Calculate statistics
function calculateStats(data: FitnessEntry[]): Statistics {
  const stats: Statistics = {
    totalDays: data.length,
    totalDistance: 0,
    stretchingStreak: 0,
    avgPerformance: 0,
    bestStairsTime: null
  };

  // Calculate total distance
  data.forEach(entry => {
    if (entry.running?.track?.length) {
      stats.totalDistance += entry.running.track.length;
    }
  });

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

  return stats;
}

// Routes
app.get('/', (req: Request, res: Response) => {
  const data = loadData();
  const stats = calculateStats(data);
  res.render('index', { data, stats });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
