'use server';
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import { prisma } from "@/lib/prisma";

export default async function getInternationals() {
  try {
    const users = await prisma.product.findMany({
        where : {proCategory:"Internationals"}
    });
    console.log(users);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
