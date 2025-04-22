'use server';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function registerUser(prevState: any, formData: FormData) {
  const title = formData.get('title') as string;
  const content = formData.get('content') as string;
  if (!title || !content) {
    return { error: 'All fields are required' };
  }
  try {
    const user = await prisma.post.create({
      data: { title,content }
    });
    return { success: true };
  } catch (error) {
    console.error('Error registering user:', error);
    return { error: 'Failed to register user' };
  }
}