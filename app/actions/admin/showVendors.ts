'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getVendors() {
  try {
    const users = await prisma.vendor.findMany();
    console.log(users)
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
