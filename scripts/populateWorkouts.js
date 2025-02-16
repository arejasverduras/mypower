const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

const prisma = new PrismaClient();

async function main() {
  const filePath = path.join(__dirname, '../mypower/cypress/fixtures/workouts.json');
  const workoutsData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  for (const workout of workoutsData) {
    await prisma.workout.create({
      data: {
        id: workout.id,
        title: workout.title,
        description: workout.description,
        isPublic: workout.isPublic,
        createdBy: {
          connectOrCreate: {
            where: { id: workout.createdById },
            create: {
              id: workout.createdById,
              name: workout.createdBy.name,
              email: workout.createdBy.email,
            },
          },
        },
        exercises: {
          create: workout.exercises.map((we) => ({
            exercise: {
              connectOrCreate: {
                where: { id: we.exercise.id },
                create: {
                  id: we.exercise.id,
                  title: we.exercise.title,
                  muscleGroup: we.exercise.muscleGroup,
                  difficulty: we.exercise.difficulty,
                },
              },
            },
            customDescription: we.customDescription,
            customSets: we.customSets,
            customRepetitions: we.customRepetitions,
            results: {
              create: we.results.map((result) => ({
                id: result.id,
                weight: result.weight,
                reps: result.reps,
                date: new Date(result.date),
              })),
            },
          })),
        },
        tags: {
          connectOrCreate: workout.tags.map((tag) => ({
            where: { id: tag.id },
            create: {
              id: tag.id,
              name: tag.name,
            },
          })),
        },
        likedBy: {
          create: workout.likedBy.map((like) => ({
            id: like.id,
            userId: like.userId,
          })),
        },
        programs: {
          create: workout.programs.map((program) => ({
            id: program.id,
            programId: program.programId,
          })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });