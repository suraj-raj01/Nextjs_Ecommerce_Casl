'use server';
import { prisma } from "../../../lib/prisma";

export default async function searchVendor(prevState: any, formData: FormData) {
  const query = formData.get('search')?.toString().toLowerCase();

  if (!query) {
    return { success: false, message: 'Please enter a search term.', data: [] };
  }

  try {
    const vendors = await prisma.vendor.findMany({
      where: {
        name: {
          contains: query,
          mode: 'insensitive',
        },
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
