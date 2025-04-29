'use server';
import { prisma } from "@/lib/prisma";


export default async function activateVendor(id: number) {
  try {
    const updatedVendor = await prisma.vendor.update({
      where: {
        id,
      },
      data: {
        status: "active",
      },
    });

    console.log("Vendor updated:", updatedVendor);
    return { success: true, data: updatedVendor };

  } catch (error) {
    console.error("Error updating vendor:", error);
    return { success: false, error: (error as Error).message };
  } finally {
    // Don't disconnect Prisma in serverless environments like Vercel/Next.js
    // await prisma.$disconnect(); ❌
  }
}
