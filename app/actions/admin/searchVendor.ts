'use server';
import { prisma } from "../../../lib/prisma";


export default async function searchVendor(prevState: any, formData: FormData) {

  const search = formData.get("search") as string

  if (!search || typeof search !== 'string') {
    return { error: 'please enter some data' };
  }

  try {
    const data = await prisma.vendor.findMany({
        where: {
            OR: [
              { name: { contains: search, mode: 'insensitive' } },
              { name: { contains: search, mode: 'insensitive' } },
            ],
          },
    })
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error updating vendor:', error);
  }
}