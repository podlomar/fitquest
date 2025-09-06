import { Layout } from "../../components/Layout";
import { FitnessEntry, Track, Statistics } from "../../types";
import { Header } from "../../components/Header";
import { AddEntryForm } from "../../components/AddEntryForm";
import { FitnessTable } from "../../components/FitnessTable";
import { Footer } from "../../components/Footer";
import { WeekNavigation } from "../../components/WeekNavigation";
import styles from './styles.module.css';

interface Props {
  alert: 'success' | 'error' | null;
  data: FitnessEntry[];
  predefinedTracks: Track[];
  availableWeeks: string[];
  selectedWeek: string;
}

export const HomePage = ({ alert, data, predefinedTracks, availableWeeks, selectedWeek }: Props) => {
  return (
    <Layout>
      <div className={styles.container}>
        <Header alert={alert} />
        <AddEntryForm predefinedTracks={predefinedTracks} />

        <WeekNavigation availableWeeks={availableWeeks} selectedWeek={selectedWeek} />

        <main>
          <FitnessTable data={data} />
        </main>

        <Footer />
      </div>
    </Layout>
  );
};
