'use server';
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

export async function registerUser(prevState: any, formData: FormData) {
  const role = formData.get('role') as string
  const name = formData.get('name') as string;
  const email = formData.get('email') as string;
  const contact = formData.get('contacts') as string;
  const password = formData.get('password') as string;
  if (!role || !name || !email || !contact || !password) {
    return { error: 'All fields are required' };
  }
  console.log(formData);
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await prisma.user.create({
      data: { 
        role:role,
        name:name,
        email:email,
        contact:contact,
        password:hashedPassword
       }
    });
    console.log(data);
    return { success: true };
  } catch (error) {
    console.error('Error registering user:', error);
    return { error: 'Failed to register user' };
  }
}