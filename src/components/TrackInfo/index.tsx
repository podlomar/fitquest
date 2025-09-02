import { Track } from "../../types";
import styles from './styles.module.css';

interface Props {
  track: Track | null;
}

export const TrackInfo = ({ track }: Props) => {
  return (
    <div id="trackInfo" className={styles.trackInfo}>
      {track === null ? (
        <span>Select a track to see details</span>
      ) : (
        <>
          <strong>{track.name}</strong><br />
          <span>Length: {track.length} km</span><br />
          <a href={track.url} target="_blank">View Track →</a>
        </>
      )}
    </div>
  );
};
