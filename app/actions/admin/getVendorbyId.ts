'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getVendorbyId(id:number) {
  try {
    const users = await prisma.vendor.findFirst({
      where :{id:Number(id)}
    });
    console.log(users)
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
