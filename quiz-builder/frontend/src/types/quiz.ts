export type QuestionType = 'boolean' | 'input' | 'checkbox';

export interface Option {
  id?: number;
  text: string;
  isCorrect: boolean;
}

export interface Question {
  id?: number;
  title: string;
  type: QuestionType;
  textAnswer?: string | null;
  options?: Option[];
}

export interface Quiz {
  id: number;
  title: string;
  questions: Question[];
}

export interface QuizListItem {
  id: number;
  title: string;
  questionsCount: number;
}

export interface CreateQuizPayload {
  title: string;
  questions: Question[];
}
