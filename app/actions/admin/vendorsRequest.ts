'use server';
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import { prisma } from "../../../lib/prisma";

export default async function vendorRequest() {
  try {
    const users = await prisma.vendor.findMany({
        where: { status:"pending" },
    });
    console.log(users)
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
