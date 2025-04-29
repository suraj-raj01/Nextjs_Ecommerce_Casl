'use server';

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import { prisma } from "@/lib/prisma";

export default async function samedayDelivery() {
  try {
    const products = await prisma.product.findMany({
      where: {
        samedaydelivery: "yes"
      },
    });
    console.log(products);
    return products;
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  } finally {
    await prisma.$disconnect();  // clean up the Prisma client
  }
}
