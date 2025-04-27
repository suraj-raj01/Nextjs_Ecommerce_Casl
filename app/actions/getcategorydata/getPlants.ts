'use server';
import { prisma } from '../../../lib/prisma';

export default async function getPlants() {
  try {
    const users = await prisma.product.findMany({
        where : {proCategory:"Plants"}
    });
    console.log(users);
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
