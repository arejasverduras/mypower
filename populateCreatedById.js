// const { PrismaClient } = require("@prisma/client");
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  // Create a placeholder user
  const placeholderUser = await prisma.user.create({
    data: { name: "Placeholder User2", email: "placeholder2@example.com", googleId: "notworking" },
  });

  console.log("Created placeholder user:", placeholderUser);

  // Update all exercises with the placeholder user's ID
  const updatedExercises = await prisma.exercise.updateMany({
    data: { createdById: placeholderUser.id },
  });

  console.log(`Updated ${updatedExercises.count} exercises with createdById.`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
