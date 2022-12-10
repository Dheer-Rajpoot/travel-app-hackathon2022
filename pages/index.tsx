import { Dashboard } from "../src/Component/Dashboard";
import styles from "../styles/Home.module.css";

export default function Home() {
  return (
    <div className={styles.container}>
      <main className="flex flex-col gap-8 w-full h-screen justify-center items-center bg-info">
        <h1 className="font-serif text-7xl pb-8 block text-primary">Welcome to SnapTravel</h1>
        <Dashboard />
      </main>
      <footer className={styles.footer}></footer>
    </div>
  );
}
