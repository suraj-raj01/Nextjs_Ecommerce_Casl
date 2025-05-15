'use server';

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function getVendorsProduct(id: string): Promise<{ success: boolean; data?: any; error?: string }> {
  console.log("Fetching products for userId:", id);

  try {
    const data = await prisma.product.findMany({
      where: {
        userId: id,
      },
    });

    console.log("Fetched data:", data);
    return { success: true, data };
  } catch (error: any) {
    console.error("Error fetching vendor's products:", error);
    return { success: false, error: error.message || "Unknown error occurred" };
  }
}
