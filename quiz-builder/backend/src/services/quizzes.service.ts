import { prisma } from "../lib/prisma";
import { CreateQuizInput, CreateQuestionInput } from "../validators/quiz.schema";
import { mapQuizDetails } from "../utils/mapQuiz";

export async function createQuiz(data: CreateQuizInput) {
  const quiz = await prisma.quiz.create({
    data: {
      title: data.title,
      questions: {
        create: data.questions.map((question: CreateQuestionInput) => {
          if (question.type === "input") {
            return {
              title: question.title,
              type: "INPUT",
              textAnswer: question.textAnswer,
            };
          }

          return {
            title: question.title,
            type: question.type === "boolean" ? "BOOLEAN" : "CHECKBOX",
            options: {
              create: question.options!.map((option) => ({
                text: option.text,
                isCorrect: option.isCorrect,
              })),
            },
          };
        }),
      },
    },
    include: {
      questions: {
        include: { options: true },
        orderBy: { id: "asc" },
      },
    },
  });

  return mapQuizDetails(quiz);
}

export async function listQuizzes() {
  const quizzes = await prisma.quiz.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { questions: true } },
    },
  });

  return quizzes.map((quiz) => ({
    id: quiz.id,
    title: quiz.title,
    questionsCount: quiz._count.questions,
  }));
}

export async function findQuizById(id: string) {
  const quiz = await prisma.quiz.findUnique({
    where: { id: Number(id) },
    include: {
      questions: {
        include: { options: true },
        orderBy: { id: "asc" },
      },
    },
  });

  if (!quiz) return null;
  return mapQuizDetails(quiz);
}

export async function removeQuiz(id: string) {
  await prisma.quiz.delete({ where: { id: Number(id) } });
}
