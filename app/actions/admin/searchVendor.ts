'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function searchVendor(query:string) {
  try {
    const vendors = await prisma.vendor.findMany({
      where: {
        name: query.toString(),
      },
    });
    console.log(vendors);
    return {
      success: true,
      message: `${vendors.length} result(s) found.`,
      data: vendors,
    };
  } catch (error) {
    console.error('Search error:', error);
    return { success: false, message: 'Something went wrong.', data: [] };
  }
}
