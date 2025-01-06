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

// import { PrismaClient } from "@prisma/client";
// import { withAccelerate } from "@prisma/extension-accelerate";

// const globalForPrisma = globalThis as unknown as { prisma: PrismaClient };

// const prisma =
//   globalForPrisma.prisma ||
//   new PrismaClient().$extends(withAccelerate());

// if (process.env.NODE_ENV !== "production") {
//   globalForPrisma.prisma = prisma;
// }

// export default prisma;

// import { PrismaClient } from '@prisma/client'
// import { withAccelerate } from '@prisma/extension-accelerate'

// const prisma = new PrismaClient().$extends(withAccelerate())

// export default prisma;