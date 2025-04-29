'use server';
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import { prisma } from "@/lib/prisma";


export default async function cancelApproveProduct(id: number) {
  try {
    const data = await prisma.product.update({
      where: {
        id,
      },
      data: {
        approve: "no",
      },
    });

    console.log("Product data updated", data);
    return { success: true, data: data };

  } catch (error) {
    console.error("Error updating vendor:", error);
    return { success: false, error: (error as Error).message };
  } 
}
