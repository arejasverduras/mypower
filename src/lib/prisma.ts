import { PrismaClient } from "@prisma/client";


const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Reuse Prisma Client instance if already defined
const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ["query"], // Optional: Logs queries for debugging
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma; // Store in global object for dev mode
}

export default prisma;
