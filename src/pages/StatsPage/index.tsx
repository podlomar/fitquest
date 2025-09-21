import { Layout } from "../../components/Layout";
import { FitnessEntry, Statistics } from "../../types";
import { Header } from "../../components/Header";
import { WeightChart } from "../../components/WeightChart";
import { SummaryCard } from "../../components/SummaryCard";
import { Footer } from "../../components/Footer";
import styles from './styles.module.css';

interface Props {
  alert: 'success' | 'error' | null;
  stats: Statistics;
  allData: FitnessEntry[];
}

export const StatsPage = ({ alert, stats, allData }: Props) => {
  return (
    <Layout>
      <Header alert={alert} />

      <main>
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>📊 Statistics & Analytics</h1>
          <p className={styles.pageDescription}>Track your fitness progress over time</p>
        </div>

        <div className={styles.summarySection}>
          <h2 className={styles.statsTitle}>Global Statistics (All Weeks)</h2>
          <div className={styles.summaryCards}>
            <SummaryCard icon="🗓️" value={stats.totalDays} label="Total Days" />
            <SummaryCard icon="🏃‍♂️" value={stats.totalDistance} label="Total Distance" />
            <SummaryCard icon="🧘‍♀️" value={stats.stretchingStreak} label="Stretching Streak" />
            <SummaryCard icon="⭐" value={stats.avgPerformance > 0 ? stats.avgPerformance : '-'} label="Avg Performance" />
            <SummaryCard icon="🏢" value={stats.bestStairsTime ? stats.bestStairsTime : '-'} label="Best 8 Flights" />
            <SummaryCard icon="⚖️" value={stats.weight !== null ? stats.weight : '-'} label="Current Weight" />
          </div>
        </div>

        <div className={styles.chartsSection}>
          <WeightChart data={allData} />

          {/* Placeholder for future charts */}
          <div className={styles.futureCharts}>
            <div className={styles.chartPlaceholder}>
              <h3>🏃‍♂️ Running Performance</h3>
              <p>Coming soon...</p>
            </div>
            <div className={styles.chartPlaceholder}>
              <h3>💪 Workout Progress</h3>
              <p>Coming soon...</p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </Layout>
  );
};
