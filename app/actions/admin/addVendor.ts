'use server';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function AddUserAction(prevState: any, formData: FormData) {
    const name = formData.get('username') as string;
    const email = formData.get('useremail') as string;
    const password = formData.get('password') as string;

    console.log(formData);

    if (!name || !email || !password) {
        return {
            success: false,
            error: "All fields are required.",
            message: ""
        };
    }

    try {

        const data = await prisma.role.findFirst({
            where:{
                role:"Vendor"
            }
        })

        console.log(data);

        await prisma.user.create({ 
            data:{
                roleId:data?.id,
                name,
                email,
                password
            }
         });

        return {
            success: true,
            error: "",
            message: "Vendor added successfully!"
        };
    } catch (err) {
        return {
            success: false,
            error: "Failed to add user.",
            message: ""
        };
    }
}
