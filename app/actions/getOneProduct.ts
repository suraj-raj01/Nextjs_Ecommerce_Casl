'use server';
import { prisma } from '../../lib/prisma';

export default async function getOneProduct(id: string) {
   try {
    const user = await prisma.product.delete({
         where: { id: Number(id) },
       });
     return user;
   } catch (error) {
    console.error('Error fetching users:', error);
    return [];
   }
}
