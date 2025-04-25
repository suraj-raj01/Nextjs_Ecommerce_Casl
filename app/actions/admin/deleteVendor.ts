'use server';

import { prisma } from "../../../lib/prisma";


export default async function deleteVendor(id: any) {
  await prisma.vendor.delete({
    where: { id: Number(id) },
  });
  return { success: true }
}