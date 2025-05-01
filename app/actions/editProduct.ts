'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function editProduct(id: number) {
   try {
     const users = await prisma.product.findFirst({
         where:{id:Number(id)}
     })
     return {success:true,users}
   } catch (error) {
        console.log(error);
   }
}