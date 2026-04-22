export function mapQuizDetails(quiz: {
  id: number;
  title: string;
  questions: Array<{
    id: number;
    title: string;
    type: string;
    textAnswer: string | null;
    options: Array<{
      id: number;
      text: string;
      isCorrect: boolean;
    }>;
  }>;
}) {
  return {
    id: quiz.id,
    title: quiz.title,
    questions: quiz.questions.map((question) => ({
      id: question.id,
      title: question.title,
      type: question.type.toLowerCase(),
      textAnswer: question.textAnswer,
      options: question.options,
    })),
  };
}
