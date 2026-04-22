'use client';

import Link from 'next/link';
import styles from './QuizCard.module.css';
import { QuizListItem } from '@/types/quiz';

interface QuizCardProps {
  quiz: QuizListItem;
  onDelete: (id: number) => void;
}

export default function QuizCard({ quiz, onDelete }: QuizCardProps) {
  const handleDelete = () => {
    const confirmed = window.confirm('Are you sure you want to delete this quiz?');

    if (confirmed) {
      onDelete(quiz.id);
    }
  };

  return (
    <div className={styles.card}>
      <div>
        <Link href={`/quizzes/${quiz.id}`} className={styles.title}>
          {quiz.title}
        </Link>

        <p className={styles.count}>Questions: {quiz.questionsCount}</p>
      </div>

      <div className={styles.actions}>
        <Link href={`/quizzes/${quiz.id}/edit`} className={styles.editLink}>
          Edit
        </Link>

        <button type="button" className={styles.deleteButton} onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
