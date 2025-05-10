'use server'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default async function createRole(prevState:any,formData:FormData){
    const userrole = formData.get("role") as string;
    console.log(userrole);
   try {
     await prisma.role.create({
        data: {
          role: userrole
        }
     })
     return{success:true}
 
   } catch (error) {
        console.log(error);
        return { error: "Something went wrong" };
   }
}

