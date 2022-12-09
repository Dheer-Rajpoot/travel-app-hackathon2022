import { Dashboard } from "../src/Component/Dashboard";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to SnapTravel</h1>
        <br />
        <Dashboard />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
