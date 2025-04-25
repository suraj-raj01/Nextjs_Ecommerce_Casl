'use server';
import { prisma } from "../../../lib/prisma";


export default async function activateVendor(id: any) {

  try {
    const updatedVendor = await prisma.vendor.update({
      where: {
        id: Number(id),
      },
      data: {
        status: "active"
      },
    });
    console.log('Vendor updated:', updatedVendor);
  } catch (error) {
    console.error('Error updating vendor:', error);
  } finally {
    await prisma.$disconnect();
  }

  return { success: true }
}