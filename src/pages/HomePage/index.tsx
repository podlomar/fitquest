import { Layout } from "../../components/Layout";
import { FitnessEntry, Track, Statistics } from "../../types";
import { Header } from "../../components/Header";
import { Button } from '../../components/Button';
import { AddEntryForm } from "../../components/AddEntryForm";
import { FitnessTable } from "../../components/FitnessTable";
import { Footer } from "../../components/Footer";
import { WeekNavigation } from "../../components/WeekNavigation";

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
      <Header alert={alert} />
      <AddEntryForm predefinedTracks={predefinedTracks} />

      <WeekNavigation availableWeeks={availableWeeks} selectedWeek={selectedWeek} />

      <main>
        <Button id="addEntryBtn" variant="primary" size="lg">+ Add New Entry</Button>
        <FitnessTable data={data} />
      </main>

      <Footer />
    </Layout>
  );
};
