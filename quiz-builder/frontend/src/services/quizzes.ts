import { CreateQuizPayload, Quiz, QuizListItem } from '@/types/quiz';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export async function getQuizzes(): Promise<QuizListItem[]> {
  const response = await fetch(`${API_URL}/quizzes`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch quizzes');
  }

  return response.json();
}

export async function getQuizById(id: string): Promise<Quiz> {
  const response = await fetch(`${API_URL}/quizzes/${id}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch quiz');
  }

  return response.json();
}

export async function createQuiz(payload: CreateQuizPayload): Promise<Quiz> {
  const response = await fetch(`${API_URL}/quizzes`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(errorData?.message || 'Failed to create quiz');
  }

  return response.json();
}

export async function updateQuiz(id: number, payload: CreateQuizPayload): Promise<Quiz> {
  const response = await fetch(`${API_URL}/quizzes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);

    throw new Error(errorData?.message || 'Failed to update quiz');
  }

  return response.json();
}

export async function deleteQuiz(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/quizzes/${id}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete quiz');
  }
}
