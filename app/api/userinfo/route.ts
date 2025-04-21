import type { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse,
) {

    if(req.method==="GET"){
        const profile  = await prisma.userinfo.findMany();
        return res.status(200).json(profile);
    }
    res.status(200).json({name:"John Doe"});
}