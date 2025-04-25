'use server';

import bcrypt from 'bcryptjs';
import { prisma } from "../../../lib/prisma";

export default async function loginUser(prevState: any, formData: FormData) {
  try {
    const role = formData.get("role") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    if (!role || !email || !password) {
      return { error: "Missing required fields" };
    }

    let user;

    if (role === "Vendor") {
      user = await prisma.vendor.findFirst({
        where: { email },
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

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("Incorrect password");
      return { error: "Incorrect password" };
    }

    console.log("Login successful:", user);
    return { success: true, data: user };
  } catch (error) {
    console.error("Error logging in user:", error);
    return { error: "Failed to log in user" };
  }
}
