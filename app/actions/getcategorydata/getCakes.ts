'use server';
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import { prisma } from "@/lib/prisma";

export default async function getCakes() {
  try {
    const users = await prisma.product.findMany({
        where : {proCategory:"Cakes"}
    });
    console.log(users);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
