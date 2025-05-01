'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();

export default async function activateAdmin(id: number) {
  try {
    const updatedVendor = await prisma.admin.update({
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
  }
}
