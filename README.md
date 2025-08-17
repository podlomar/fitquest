# Fitness Tracker

A mobile-friendly dark-themed web application built with Node.js and TypeScript that displays fitness tracking data from YAML files.

## Features

- 📊 **Dashboard with key metrics**: Total days, distance, stretching streak, performance average, and best stairs time
- 🏃‍♂️ **Detailed activity tracking**: Running routes, progress, workouts, stretching, and stairs
- 📱 **Mobile-responsive design**: Looks great on all devices
- 🌙 **Dark theme**: Easy on the eyes with glass morphism effects
- 🇨🇿 **Czech localization**: Date formatting with Czech day and month names

## Technology Stack

- **TypeScript** for type safety
- **Node.js** with Express.js server
- **Nunjucks** templating engine
- **YAML** for data storage
- **CSS** with custom properties and responsive design

## Data Types

The application uses strongly-typed TypeScript interfaces:

```typescript
interface FitnessEntry {
  date: string;
  running: Running;
  workout: Workout | 'rest';
  stretching: boolean;
  stairs: StairsData | 'away' | 'none';
}
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Build the TypeScript project:
   ```bash
   npm run build
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Open your browser to `http://localhost:3001`

### Development

For development with auto-rebuild:
```bash
npm run dev
```

For TypeScript compilation in watch mode:
```bash
npm run watch
```

## Data Format

Add your fitness data to `data.yml` using this structure:

```yaml
- date: 2025-08-16
  running:
    track:
      name: "Track Name"
      length: 4
      progress: "milestone description"
      url: "http://example.com/track"
    performance: 2  # 1-5 stars or 'none'
  workout:
    level: mid  # 'low', 'mid', 'high', 'base', 'off'
    content: "12d 8k"
  stretching: true
  stairs:
    floors: 8
    time: "1:15"  # or 'away' or 'none'
```

## Statistics Tracked

- **Total Days**: Number of logged activity days
- **Total Distance**: Sum of all running distances
- **Stretching Streak**: Consecutive days with stretching
- **Average Performance**: Mean star rating for runs
- **Best 8 Flights**: Fastest time for 8-floor stair climbing

## Scripts

- `npm start` - Start the production server
- `npm run dev` - Start development server with auto-reload
- `npm run build` - Compile TypeScript to JavaScript
- `npm run watch` - Watch TypeScript files for changes
