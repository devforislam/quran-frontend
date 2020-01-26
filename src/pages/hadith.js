
import styles from './hadith.css';

export default function(props) {
  const {isMobile} = props
  console.log('Hadith page', isMobile, props);
  return (
    <div className={styles.textCenter}>
      <h1>Insha-Allah, This feature will be launched soon.</h1>
    </div>
  );
}
