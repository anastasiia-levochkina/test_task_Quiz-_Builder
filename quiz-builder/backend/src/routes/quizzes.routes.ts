import { Router } from "express";
import { deleteQuiz, getQuizById, getQuizzes, postQuiz } from "../controllers/quizzes.controller";

const quizzesRouter = Router();

quizzesRouter.post("/quizzes", postQuiz);
quizzesRouter.get("/quizzes", getQuizzes);
quizzesRouter.get("/quizzes/:id", getQuizById);
quizzesRouter.delete("/quizzes/:id", deleteQuiz);

export default quizzesRouter;
