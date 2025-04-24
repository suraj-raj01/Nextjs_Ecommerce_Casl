'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getVendors() {
  try {
    const users = await prisma.user.findMany({
      where: { role: "Vendor" },
    });
    console.log(users)
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
