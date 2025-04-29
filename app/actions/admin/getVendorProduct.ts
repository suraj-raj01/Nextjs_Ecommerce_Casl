'use server';
// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import { prisma } from "../../../lib/prisma";


export default async function getVendorsProduct(id:number) {
  try {
    const data = await prisma.product.findMany({
      where :{
        vendorId:Number(id)
      }
    });
    console.log(data)
    return {success:true,data};
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}
