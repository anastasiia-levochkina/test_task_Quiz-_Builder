'use client';

import { useEffect, useState } from 'react';
import styles from './page.module.css';
import { deleteQuiz, getQuizzes } from '@/services/quizzes';
import { QuizListItem } from '@/types/quiz';
import QuizCard from '@/components/QuizCard';

export default function QuizzesPage() {
  const [quizzes, setQuizzes] = useState<QuizListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadQuizzes = async () => {
      try {
        const data = await getQuizzes();
        setQuizzes(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load quizzes');
        }
      } finally {
        setLoading(false);
      }
    };

    loadQuizzes();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteQuiz(id);
      setQuizzes((currentQuizzes) => currentQuizzes.filter((quiz) => quiz.id !== id));
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to delete quiz');
      }
    }
  };

  if (loading) {
    return <p className={styles.message}>Loading quizzes...</p>;
  }

  if (error) {
    return <p className={styles.error}>{error}</p>;
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>All Quizzes</h1>

      {quizzes.length === 0 ? (
        <p className={styles.message}>No quizzes found.</p>
      ) : (
        <div className={styles.list}>
          {quizzes.map((quiz) => (
            <QuizCard key={quiz.id} quiz={quiz} onDelete={handleDelete} />
          ))}
        </div>
      )}
    </div>
  );
}
