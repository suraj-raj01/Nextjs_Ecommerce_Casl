'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();


export default async function deleteProduct(id: number) {
  await prisma.product.delete({
    where: {
      id: id
    },
  });
}