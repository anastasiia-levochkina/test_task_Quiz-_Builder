import { Router } from 'express';
import { ZodError } from 'zod';
import { prisma } from '../lib/prisma';
import { createQuizSchema } from '../validators/quizSchema';
import { mapQuizDetails } from '../utils/mapQuiz';

type QuizListRow = {
  id: number;
  title: string;
  _count: {
    questions: number;
  };
};

const router = Router();

router.post('/quizzes', async (req, res) => {
  try {
    const data = createQuizSchema.parse(req.body);

    const createdQuiz = await prisma.quiz.create({
      data: {
        title: data.title,
        questions: {
          create: data.questions.map((question) => {
            if (question.type === 'input') {
              return {
                title: question.title,
                type: 'INPUT',
                textAnswer: question.textAnswer,
              };
            }

            return {
              title: question.title,
              type: question.type === 'boolean' ? 'BOOLEAN' : 'CHECKBOX',
              options: {
                create: question.options.map((option) => ({
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
          include: {
            options: true,
          },
          orderBy: {
            id: 'asc',
          },
        },
      },
    });

    return res.status(201).json(mapQuizDetails(createdQuiz));
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.flatten(),
      });
    }

    console.error('POST /quizzes error:', error);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

router.get('/quizzes', async (_req, res) => {
  try {
    const quizzes = await prisma.quiz.findMany({
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        _count: {
          select: {
            questions: true,
          },
        },
      },
    });

    const result = quizzes.map((quiz: QuizListRow) => ({
      id: quiz.id,
      title: quiz.title,
      questionsCount: quiz._count.questions,
    }));

    return res.status(200).json(result);
  } catch (error) {
    console.error('GET /quizzes error:', error);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

router.get('/quizzes/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid quiz id',
      });
    }

    const quiz = await prisma.quiz.findUnique({
      where: { id },
      include: {
        questions: {
          include: {
            options: true,
          },
          orderBy: {
            id: 'asc',
          },
        },
      },
    });

    if (!quiz) {
      return res.status(404).json({
        message: 'Quiz not found',
      });
    }

    return res.status(200).json(mapQuizDetails(quiz));
  } catch (error) {
    console.error('GET /quizzes/:id error:', error);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

router.put('/quizzes/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid quiz id',
      });
    }

    const data = createQuizSchema.parse(req.body);

    const existingQuiz = await prisma.quiz.findUnique({
      where: { id },
    });

    if (!existingQuiz) {
      return res.status(404).json({
        message: 'Quiz not found',
      });
    }

    const updatedQuiz = await prisma.quiz.update({
      where: { id },
      data: {
        title: data.title,
        questions: {
          deleteMany: {},
          create: data.questions.map((question) => {
            if (question.type === 'input') {
              return {
                title: question.title,
                type: 'input',
                textAnswer: question.textAnswer,
              };
            }

            return {
              title: question.title,
              type: question.type,
              options: {
                create: question.options.map((option) => ({
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
          include: {
            options: true,
          },
          orderBy: {
            id: 'asc',
          },
        },
      },
    });

    return res.status(200).json(mapQuizDetails(updatedQuiz));
  } catch (error) {
    if (error instanceof ZodError) {
      return res.status(400).json({
        message: 'Validation failed',
        errors: error.flatten(),
      });
    }

    console.error('PUT /quizzes/:id error:', error);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

router.delete('/quizzes/:id', async (req, res) => {
  try {
    const id = Number(req.params.id);

    if (Number.isNaN(id)) {
      return res.status(400).json({
        message: 'Invalid quiz id',
      });
    }

    const existingQuiz = await prisma.quiz.findUnique({
      where: { id },
    });

    if (!existingQuiz) {
      return res.status(404).json({
        message: 'Quiz not found',
      });
    }

    await prisma.quiz.delete({
      where: { id },
    });

    return res.status(200).json({
      message: 'Quiz deleted successfully',
    });
  } catch (error) {
    console.error('DELETE /quizzes/:id error:', error);

    return res.status(500).json({
      message: 'Internal server error',
    });
  }
});

export default router;
