'use server';
import { prisma } from '../../lib/prisma'
// import { PrismaClient } from "@prisma/client";
import axios from "axios"
// const prisma = new PrismaClient();

export async function productData(prevState: any, formData: FormData) {
  const title = formData.get("title") as string
  const products = formData.get("products") as string;
  const price = Number(formData.get("price"));
  const details = formData.get("details") as string;
  const category = formData.get("category") as string;
  const proinfo = formData.get("proinfo") as string;
  const myimg = formData.get("imgurl") as string;

  if (!title || !products || !price || !details || !category || !proinfo || !myimg) {
    return { error: 'All fields are required' };
  }
  let imgurl = "";

  if (myimg) {
    let formData1 = new FormData();
    formData1.append("file", myimg);
    formData1.append("upload_preset", "myphotos");
    formData1.append("cloud_name", "dtrpmtbie");
    let cloudinary_api = "https://api.cloudinary.com/v1_1/dtrpmtbie/auto/upload";
    try {
      const response = await axios.post(cloudinary_api, formData1);
      console.log(response.data.url);
      imgurl = response.data.url;
    } catch (error) {
      console.log(error);
    }
  }
  console.log(formData, imgurl);

  try {
    const data = await prisma.product.create({
      data: {
        proname:products,
        protitle:title,
        proprice:price,
        prodesc:details,
        proCategory:category,
        proinfo:proinfo,
        proimgurl:imgurl
      }
    })
    console.log(data);
    return { success: true };
  } catch (error) {
    console.error('Error registering user:', error);
    return { error: 'Failed to register user' };
  }
}