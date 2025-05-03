'use server';
import bcrypt from 'bcryptjs';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

let otp = 0

export default async function loginUser(prevState: any, formData: FormData) {
  try {
    const role = formData.get("role") as string;
    const email = formData.get("email") as string;
    const enteredOtp = formData.get("otp") as string
    const password = formData.get("password") as string;

    if (!role || !email || !password || !enteredOtp) {
      return { error: "Missing required fields" };
    }

    let user;

    if (role === "Vendor") {
      user = await prisma.vendor.findFirst({
        where: { email: email },
      });
    } else if (role === "Admin") {
      user = await prisma.admin.findFirst({
        where: { email },
      });
    } else {
      return { error: "Invalid role" };
    }

    if (!user) {
      console.log("User not found");
      return { error: "User not found" };
    }

    if (enteredOtp !== otp.toString()) {
      return { error: "Otp Incorrect" }
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Incorrect password");
      return { error: "Incorrect password" };
    }

    console.log("Login successful:", user);
    return { success: true, data: user };
  } catch (error) {
    console.error("Error logging in user:", error);
    return { error: "You don't have access control Please Contact to Admin or SuperAdmin" };
  }
}

// -----------------------------------------------------------------

import { sendEmail } from '../../../lib/sendEmail';
import { revalidatePath } from 'next/cache';

export async function sendOtp(role: any, email: any) {

  otp = Math.floor(Math.random() * 10000);
  otp.toString().padStart(4, '0');

  let user;
  let username;
  if (role === "Vendor") {
    user = await prisma.vendor.findFirst({
      where: { email: email },
    });
    username = user?.name;
  } else if (role === "Admin") {
    user = await prisma.admin.findFirst({
      where: { email },
    });
    username = user?.name;
  } else {
    return { error: "Invalid role" };
  }
  if (user) {
    const result = await sendEmail({
      to: email,
      subject: `Contact Form Submission from ${email}`,
      html: `<p>Name: ${username}</p><p>Email: ${email}</p><p>OTP: ${otp}</p>`,
    });

    if (result.success) {
      return { success: true, message: 'Email sent successfully!' };
    } else {
      return { success: false, message: 'Failed to send email.', error: result.error };
    }
  } else {
    return { error: "user not found" }
  }
} 