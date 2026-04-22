'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import QuestionBuilder from '@/components/QuestionBuilder';
import { createQuiz } from '@/services/quizzes';
import { Question } from '@/types/quiz';

function createEmptyQuestion(): Question {
  return {
    title: '',
    type: 'boolean',
    options: [
      { text: 'True', isCorrect: true },
      { text: 'False', isCorrect: false },
    ],
  };
}

export default function CreateQuizPage() {
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([createEmptyQuestion()]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleQuestionChange = (index: number, updatedQuestion: Question) => {
    setQuestions((currentQuestions) =>
      currentQuestions.map((question, currentIndex) =>
        currentIndex === index ? updatedQuestion : question,
      ),
    );
  };

  const addQuestion = () => {
    setQuestions((currentQuestions) => [...currentQuestions, createEmptyQuestion()]);
  };

  const removeQuestion = (index: number) => {
    if (questions.length === 1) {
      return;
    }

    setQuestions((currentQuestions) =>
      currentQuestions.filter((_, currentIndex) => currentIndex !== index),
    );
  };

  const validateForm = () => {
    if (!title.trim()) {
      return 'Quiz title is required';
    }

    for (const question of questions) {
      if (!question.title.trim()) {
        return 'Each question must have a title';
      }

      if (question.type === 'input' && !question.textAnswer?.trim()) {
        return 'Input questions must have a correct answer';
      }

      if ((question.type === 'boolean' || question.type === 'checkbox') && !question.options?.length) {
        return 'Choice questions must have options';
      }

      if (question.type === 'checkbox') {
        const hasEmptyOption = question.options?.some((option) => !option.text.trim());

        if (hasEmptyOption) {
          return 'Checkbox options cannot be empty';
        }
      }
    }

    return '';
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      setLoading(true);

      await createQuiz({
        title,
        questions,
      });

      router.push('/quizzes');
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to create quiz');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Create Quiz</h1>

      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label}>Quiz title</label>
          <input
            type="text"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className={styles.input}
            placeholder="Enter quiz title"
          />
        </div>

        <div className={styles.questionsList}>
          {questions.map((question, index) => (
            <QuestionBuilder
              key={index}
              question={question}
              index={index}
              onChange={handleQuestionChange}
              onRemove={removeQuestion}
            />
          ))}
        </div>

        <button type="button" className={styles.secondaryButton} onClick={addQuestion}>
          Add Question
        </button>

        {error && <p className={styles.error}>{error}</p>}

        <button type="submit" className={styles.submitButton} disabled={loading}>
          {loading ? 'Creating...' : 'Create Quiz'}
        </button>
      </form>
    </div>
  );
}
