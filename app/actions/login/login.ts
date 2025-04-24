'use server';

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();

export default async function loginUser(prevState: any, formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  try {
    const user = await prisma.user.findFirst({
      where: { email:email },
    });
    if (!user) {
        console.log("User not found")
      return { error: 'User not found' };
    }
    const isMatch = await bcrypt.compare(password,user.password);
    if (!isMatch) {
        console.log("Incorrect password")
      return { error: 'Incorrect password' };
    }
    console.log(user);
    return { success: true, data: user };

  } catch (error) {
    console.error('Error logging in user:', error);
    return { error: 'Failed to log in user' };
  }
}
