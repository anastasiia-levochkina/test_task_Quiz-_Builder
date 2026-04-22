import type { Request, Response } from "express";
import { z } from "zod";
import {
  createQuiz,
  findQuizById,
  listQuizzes,
  removeQuiz,
} from "../services/quizzes.service";
import { createQuizSchema } from "../validators/quiz.schema";

const quizIdSchema = z.object({
  id: z.string().min(1),
});

export async function postQuiz(req: Request, res: Response) {
  try {
    const validatedData = createQuizSchema.parse(req.body);
    const quiz = await createQuiz(validatedData);

    return res.status(201).json(quiz);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        message: "Invalid payload",
        issues: error.issues,
      });
    }

    return res.status(400).json({
      message: "Failed to create quiz",
    });
  }
}

export async function getQuizzes(_req: Request, res: Response) {
  const quizzes = await listQuizzes();
  return res.status(200).json(quizzes);
}

export async function getQuizById(req: Request, res: Response) {
  const params = quizIdSchema.safeParse(req.params);
  if (!params.success) {
    return res.status(400).json({
      message: "Invalid quiz id",
    });
  }

  const quiz = await findQuizById(params.data.id);
  if (!quiz) {
    return res.status(404).json({
      message: "Quiz not found",
    });
  }

  return res.status(200).json(quiz);
}

export async function deleteQuiz(req: Request, res: Response) {
  const params = quizIdSchema.safeParse(req.params);
  if (!params.success) {
    return res.status(400).json({
      message: "Invalid quiz id",
    });
  }

  await removeQuiz(params.data.id);
  return res.status(200).json({ message: "Quiz deleted successfully" });
}
