'use server';
import { prisma } from '../../lib/prisma';

export default async function getProduct() {
  try {
    const users = await prisma.product.findMany();
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
