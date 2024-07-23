import styles from './app.module.css';
import Searchbar from './Searchbar/Sesrchbar';


export const App = () => {
  return(
    <div className={styles.app}>
      <Searchbar />
    </div>
  )
};
