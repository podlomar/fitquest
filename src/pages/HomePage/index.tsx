import { FitnessEntry, PredefinedTrack, Statistics } from "../../types";
import { Header } from "../../components/Header";
import { AddEntryForm } from "../../components/AddEntryForm";
import { FitnessTable } from "../../components/FitnessTable";
import { SummaryCard } from "../../components/SummaryCard";
import { Footer } from "../../components/Footer";

interface Props {
  alert: 'success' | 'error' | null;
  stats: Statistics;
  data: FitnessEntry[];
  predefinedTracks: PredefinedTrack[];
}

export const HomePage = ({ alert, stats, data, predefinedTracks }: Props) => {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Fitness Tracker</title>
        <link rel="stylesheet" href="/styles.css" />
        <link rel="stylesheet" href="/server.css" />

        <script defer src="/index.js"></script>
      </head>

      <body>
        <div className="container">
          <Header alert={alert} />
          <AddEntryForm predefinedTracks={predefinedTracks} />

          <main>
            <div className="summary-section">
              <div className="summary-cards">
                <SummaryCard icon="🗓️" value={stats.totalDays} label="Total Days" />
                <SummaryCard icon="🏃‍♂️" value={stats.totalDistance} label="Total Distance" />
                <SummaryCard icon="🧘‍♀️" value={stats.stretchingStreak} label="Stretching Streak" />
                <SummaryCard icon="⭐" value={stats.avgPerformance > 0 ? stats.avgPerformance : '-'} label="Avg Performance" />
                <SummaryCard icon="🏢" value={stats.bestStairsTime ? stats.bestStairsTime : '-'} label="Best 8 Flights" />
                <SummaryCard icon="⏲️" value={stats.weight !== null ? stats.weight : '-'} label="Current Weight" />
              </div>
            </div>

            <FitnessTable data={data} />
          </main>

          <Footer />
        </div>
      </body>
    </html>
  );
};
