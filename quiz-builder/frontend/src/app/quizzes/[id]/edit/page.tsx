'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import QuestionBuilder from '@/components/QuestionBuilder';
import { getQuizById, updateQuiz } from '@/services/quizzes';
import { Question } from '@/types/quiz';
import styles from './page.module.css';

export default function EditQuizPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();

  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const id = Number(params.id);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const quiz = await getQuizById(String(params.id));
        setTitle(quiz.title);
        setQuestions(quiz.questions);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('Failed to load quiz');
        }
      } finally {
        setLoading(false);
      }
    };

    loadQuiz();
  }, [params.id]);

  const handleQuestionChange = (index: number, updatedQuestion: Question) => {
    setQuestions((currentQuestions) =>
      currentQuestions.map((question, currentIndex) =>
        currentIndex === index ? updatedQuestion : question,
      ),
    );
  };

  const removeQuestion = (index: number) => {
    if (questions.length <= 1) {
      return;
    }

    setQuestions((currentQuestions) =>
      currentQuestions.filter((_, currentIndex) => currentIndex !== index),
    );
  };

  const addQuestion = () => {
    setQuestions((currentQuestions) => [
      ...currentQuestions,
      {
        title: '',
        type: 'boolean',
        options: [
          { text: 'True', isCorrect: true },
          { text: 'False', isCorrect: false },
        ],
      },
    ]);
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
      setSaving(true);
      await updateQuiz(id, {
        title,
        questions,
      });
      router.push(`/quizzes/${id}`);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to update quiz');
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className={styles.message}>Loading quiz...</p>;
  }

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Edit Quiz</h1>

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
              key={question.id || index}
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

        <button type="submit" className={styles.submitButton} disabled={saving}>
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </form>
    </div>
  );
}
