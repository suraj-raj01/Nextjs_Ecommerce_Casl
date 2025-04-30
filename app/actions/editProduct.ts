'use server';

import {prisma} from '../../lib/prisma'; // or your DB client

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