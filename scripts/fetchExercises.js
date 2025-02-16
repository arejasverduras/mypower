const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  const exercises = await prisma.exercise.findMany();
  console.log(exercises);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

