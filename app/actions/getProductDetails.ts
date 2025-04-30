'use server';
import { prisma } from "@/lib/prisma";

export default async function getProductDetails(id:number) {
  try {
    const users = await prisma.product.findFirst({
        where:{id:Number(id)}
    });
    return {success:true,users};
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
