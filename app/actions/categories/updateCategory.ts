'use server';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// import { PrismaClient } from '@prisma/client';
// const prisma  = new PrismaClient();


export default async function updateCategory(id:number) {
  await prisma.addCategory.delete({
    where: { id: Number(id) },
  });
}