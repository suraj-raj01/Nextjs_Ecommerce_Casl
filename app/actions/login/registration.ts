'use server';
import {prisma} from "../../../lib/prisma"
import bcrypt from "bcryptjs";


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
  if(role==="Admin"){
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await prisma.admin.create({
      data: { 
        role:role,
        name:name,
        email:email,
        contact: contact.toString(),
        password:hashedPassword
       }
    });
    console.log(data);
    return { success: true,message:"Registration success" };
  } catch (error) {
    console.error('Error registering user:', error);
    return { error: 'Failed to register user' };
  }
}
else if(role==="Vendor"){
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const data = await prisma.vendor.create({
      data: { 
        role:role,
        name:name,
        email:email,
        contact:contact.toString(),
        password:hashedPassword,
       }
    });
    console.log(data);
    return { success: true };
  } catch (error) {
    console.error('Error registering user:', error);
    return { error: 'Failed to register user' };
  }
}
}