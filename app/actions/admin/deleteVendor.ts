'use server';

import { prisma } from "@/lib/prisma";


export default async function deleteVendor(id: number) {
  await prisma.vendor.delete({
    where: { id: id },
  });
  return { success: true }
}