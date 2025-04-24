'use server';

// import {prisma} from '../../lib/prisma'; // or your DB client
import { PrismaClient } from '@prisma/client';
const prisma  = new PrismaClient();


export default async function deleteProduct(id: string) {
  await prisma.product.delete({
    where: { id: Number(id) },
  });
}