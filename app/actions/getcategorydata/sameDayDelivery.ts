'use server';
import { prisma } from '../../../lib/prisma';

export default async function samedayDelivery() {
  try {
    const users = await prisma.product.findMany({
        where : {samedaydelivery:"yes"}
    });
    console.log(users);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
