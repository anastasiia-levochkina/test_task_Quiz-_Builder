import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          Quiz Builder
        </Link>

        <nav className={styles.nav}>
          <Link href="/create" className={styles.link}>
            Create Quiz
          </Link>

          <Link href="/quizzes" className={styles.link}>
            All Quizzes
          </Link>
        </nav>
      </div>
    </header>
  );
}
