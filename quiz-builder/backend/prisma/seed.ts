import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.quiz.create({
    data: {
      title: 'JavaScript Basics',
      questions: {
        create: [
          {
            title: 'JavaScript is single-threaded?',
            type: 'BOOLEAN',
            options: {
              create: [
                { text: 'True', isCorrect: true },
                { text: 'False', isCorrect: false },
              ],
            },
          },
          {
            title: 'Which keyword is used to declare a constant?',
            type: 'INPUT',
            textAnswer: 'const',
          },
          {
            title: 'Which of these are JavaScript libraries or frameworks?',
            type: 'CHECKBOX',
            options: {
              create: [
                { text: 'React', isCorrect: true },
                { text: 'Angular', isCorrect: true },
                { text: 'Laravel', isCorrect: false },
              ],
            },
          },
        ],
      },
    },
  });

  console.log('Seed completed');
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
