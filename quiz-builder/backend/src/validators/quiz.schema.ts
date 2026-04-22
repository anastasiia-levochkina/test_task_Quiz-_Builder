import { z } from 'zod';

const optionSchema = z.object({
  text: z.string().trim().min(1, 'Option text is required'),
  isCorrect: z.boolean(),
});

const booleanQuestionSchema = z.object({
  title: z.string().trim().min(1, 'Question title is required'),
  type: z.literal('boolean'),
  options: z
    .array(optionSchema)
    .length(2, 'Boolean question must have exactly 2 options'),
  textAnswer: z.undefined().optional(),
});

const inputQuestionSchema = z.object({
  title: z.string().trim().min(1, 'Question title is required'),
  type: z.literal('input'),
  textAnswer: z.string().trim().min(1, 'Text answer is required'),
  options: z.undefined().optional(),
});

const checkboxQuestionSchema = z.object({
  title: z.string().trim().min(1, 'Question title is required'),
  type: z.literal('checkbox'),
  options: z
    .array(optionSchema)
    .min(2, 'Checkbox question must have at least 2 options'),
  textAnswer: z.undefined().optional(),
});

const questionSchema = z.discriminatedUnion('type', [
  booleanQuestionSchema,
  inputQuestionSchema,
  checkboxQuestionSchema,
]);

export type CreateQuestionInput = z.infer<typeof questionSchema>;

export const createQuizSchema = z.object({
  title: z.string().trim().min(1, 'Quiz title is required'),
  questions: z.array(questionSchema).min(1, 'Quiz must have at least one question'),
});

export type CreateQuizInput = z.infer<typeof createQuizSchema>;
