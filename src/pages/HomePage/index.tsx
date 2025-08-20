import { FitnessEntry, PredefinedTrack, Statistics } from "../../types";
import { Header } from "../../components/Header";
import { AddEntryForm } from "../../components/AddEntryForm";
import { FitnessTable } from "../../components/FitnessTable";
import { SummaryCard } from "../../components/SummaryCard";

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

        <script defer src="/index.js"></script>
      </head>

      <body>
        <div className="container">
          <Header alert={alert} />

          <div id="addEntryForm" className="form-container" style={{ display: "none" }}>
            <div className="form-wrapper">
              <h2>Add New Fitness Entry</h2>
              <AddEntryForm predefinedTracks={predefinedTracks} />
            </div>
          </div>

          <main>
            <div className="summary-section">
              <div className="summary-cards">
                <SummaryCard icon="📅" value={stats.totalDays} label="Total Days" />
                <SummaryCard icon="🏃‍♂️" value={stats.totalDistance} label="Total Distance" />
                <SummaryCard icon="🧘‍♀️" value={stats.stretchingStreak} label="Stretching Streak" />
                <SummaryCard icon="⭐" value={stats.avgPerformance > 0 ? stats.avgPerformance : '-'} label="Avg Performance" />
                <SummaryCard icon="🏢" value={stats.bestStairsTime ? stats.bestStairsTime : '-'} label="Best 8 Flights" />
                <SummaryCard icon="⚖️" value={stats.currentWeight ? stats.currentWeight : '-'} label="Current Weight" />
                <SummaryCard icon="📈" value={stats.weightChange ? `${stats.weightChange > 0 ? '+' : ''}${stats.weightChange} kg` : '-'} label="Weight Change" />
              </div>
            </div>

            <div className="table-wrapper">
              <FitnessTable data={data} />
            </div>

            {data.length === 0 ? (
              <div className="no-data">
                <p>No fitness data available</p>
              </div>
            ) : null}
          </main>

          <footer>
            <p>Keep up the great work! 💪</p>
          </footer>
        </div>
      </body>
    </html>
  );
};
