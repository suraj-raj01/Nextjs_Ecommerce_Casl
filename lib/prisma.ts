import { PrismaClient } from "@prisma/client";

// Use a global variable to preserve the PrismaClient across hot reloads in dev
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

// Only assign once in development
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
