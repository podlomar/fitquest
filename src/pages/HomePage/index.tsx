import { Layout } from "../../components/Layout";
import { FitnessEntry, Track } from "../../types";
import { Header } from "../../components/Header";
import { Button } from "../../components/Button";
import { Card } from "../../components/Card";
import { AddEntryForm } from "../../components/AddEntryForm";
import { DayEntryCard } from "../../components/DayEntryCard";
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
      <Header alert={alert} />
      <AddEntryForm predefinedTracks={predefinedTracks} />

      <WeekNavigation availableWeeks={availableWeeks} selectedWeek={selectedWeek} />

      <Card title="Your Fitness Entries" meta={<span>{data.length} entries found</span>}>
        <p>Keep track of your daily fitness activities and monitor your progress over time. Your entries will appear here as you log them.</p>
      </Card>


      <main>
        <Button id="addEntryBtn" variant="primary" size="lg">+ Add New Entry</Button>
        <div className={styles.entriesContainer}>
          {data.length > 0 ? (
            data.map((entry) => (
              <DayEntryCard key={entry.date} entry={entry} />
            ))
          ) : (
            <div className={styles.noEntries}>
              <p>No entries for this week yet. Add your first entry above! 💪</p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </Layout>
  );
};
