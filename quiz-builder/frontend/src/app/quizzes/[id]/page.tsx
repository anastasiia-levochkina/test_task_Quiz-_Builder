import styles from './page.module.css';
import Link from 'next/link';
import { getQuizById } from '@/services/quizzes';

interface QuizDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function QuizDetailsPage({ params }: QuizDetailsPageProps) {
  const { id } = await params;
  const quiz = await getQuizById(id);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>{quiz.title}</h1>
      <p>
        <Link href={`/quizzes/${id}/edit`}>Edit quiz</Link>
      </p>

      <div className={styles.questionsList}>
        {quiz.questions.map((question, index) => (
          <div key={question.id || index} className={styles.card}>
            <h2 className={styles.questionTitle}>
              {index + 1}. {question.title}
            </h2>

            <p className={styles.type}>Type: {question.type}</p>

            {question.type === 'input' && (
              <p className={styles.answer}>Correct answer: {question.textAnswer}</p>
            )}

            {(question.type === 'boolean' || question.type === 'checkbox') && (
              <ul className={styles.optionsList}>
                {question.options?.map((option, optionIndex) => (
                  <li key={option.id || optionIndex} className={styles.optionItem}>
                    {option.text} {option.isCorrect ? '(correct)' : ''}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
