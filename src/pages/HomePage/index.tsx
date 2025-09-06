import { Layout } from "../../components/Layout";
import { FitnessEntry, Track, Statistics } from "../../types";
import { Header } from "../../components/Header";
import { AddEntryForm } from "../../components/AddEntryForm";
import { FitnessTable } from "../../components/FitnessTable";
import { SummaryCard } from "../../components/SummaryCard";
import { WeightChart } from "../../components/WeightChart";
import { Footer } from "../../components/Footer";
import { WeekNavigation } from "../../components/WeekNavigation";
import styles from './styles.module.css';

interface Props {
  alert: 'success' | 'error' | null;
  stats: Statistics;
  data: FitnessEntry[];
  allData: FitnessEntry[]; // All data for weight chart
  predefinedTracks: Track[];
  availableWeeks: string[];
  selectedWeek: string;
}

export const HomePage = ({ alert, stats, data, allData, predefinedTracks, availableWeeks, selectedWeek }: Props) => {
  return (
    <Layout>
      <div className={styles.container}>
        <Header alert={alert} />
        <AddEntryForm predefinedTracks={predefinedTracks} />

        <WeekNavigation availableWeeks={availableWeeks} selectedWeek={selectedWeek} />

        <main>
          <div className={styles.summarySection}>
            <h2 className={styles.statsTitle}>Global Statistics (All Weeks)</h2>
            <div className={styles.summaryCards}>
              <SummaryCard icon="🗓️" value={stats.totalDays} label="Total Days" />
              <SummaryCard icon="🏃‍♂️" value={stats.totalDistance} label="Total Distance" />
              <SummaryCard icon="🧘‍♀️" value={stats.stretchingStreak} label="Stretching Streak" />
              <SummaryCard icon="⭐" value={stats.avgPerformance > 0 ? stats.avgPerformance : '-'} label="Avg Performance" />
              <SummaryCard icon="🏢" value={stats.bestStairsTime ? stats.bestStairsTime : '-'} label="Best 8 Flights" />
              <SummaryCard icon="⏲️" value={stats.weight !== null ? stats.weight : '-'} label="Current Weight" />
            </div>
          </div>

          <WeightChart data={allData} />

          <FitnessTable data={data} />
        </main>

        <Footer />
      </div>
    </Layout>
  );
};
