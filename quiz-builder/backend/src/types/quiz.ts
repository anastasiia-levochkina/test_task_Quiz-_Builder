export type QuestionType = 'boolean' | 'input' | 'checkbox';

export interface CreateOptionInput {
  text: string;
  isCorrect: boolean;
}

export interface CreateQuestionInput {
  title: string;
  type: QuestionType;
  textAnswer?: string;
  options?: CreateOptionInput[];
}

export interface CreateQuizInput {
  title: string;
  questions: CreateQuestionInput[];
}
