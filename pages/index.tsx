import { Dashboard } from "../src/Component/Dashboard";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <div className="border-2 w-full text-center absolute top-0 left-0 right-0 bottom-0 align-middle">
          <h1 className="mt-52 mb-20 text-6xl">Welcome to SnapTravel</h1>
          <br />
          <Dashboard />
        </div>
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
