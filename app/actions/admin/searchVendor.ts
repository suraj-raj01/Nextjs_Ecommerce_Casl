'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function searchVendor(searchData: string) {
  console.log("Search Query:", searchData);

  if (!searchData) {
    return { success: false, message: "Search query cannot be empty.", data: [] };
  }

  try {
    const vendors = await prisma.vendor.findMany({
      where: {
        name: {
          contains: searchData as string,
          mode: 'insensitive',
        },
      },
    });

    console.log("Search Results:", vendors);
    return {
      success: true,
      message: `${vendors.length} result(s) found.`,
      data: vendors,
    };
  } catch (error) {
    console.error("Search error:",error);
    return { success: false, message: "An error occurred while searching.", data: [] };
  }
}