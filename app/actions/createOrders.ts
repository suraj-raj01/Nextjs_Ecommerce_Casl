'use server';

import { PrismaClient } from "@prisma/client";
import Razorpay from "razorpay";

const prisma = new PrismaClient();

export async function createOrder(prevState: any, formData: FormData) {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  });

  try {
    const amount = Number(formData.get("total")) * 100;
    const contact = formData.get("contact");
    const address = formData.get("address") as string;
    const pincode = formData.get("pincode");
    const username = formData.get("username") as string;
    const useremail = formData.get("useremail") as string;
    const productsRaw = JSON.parse(formData.get("products") as unknown as string);
    const vendoremail = formData.get("vendoremail") as string;
    const razorpayPaymentId = formData.get("razorpayPaymentId") as string;
    const razorpayOrderId = formData.get("razorpayOrderId") as string;
    const razorpaySignature = formData.get("razorpaySignature") as string;

    if (
      !username ||
      !useremail ||
      !contact ||
      !address ||
      !pincode ||
      !productsRaw ||
      !amount
    ) {
      throw new Error("Missing required form data");
    }

    let parsedProducts;
    if (typeof productsRaw.toString() ==="string") {
      try {
        parsedProducts = productsRaw;
      } catch (error) {
        throw new Error("Invalid JSON format for products");
      }
    }

    

    console.log(formData);

    await prisma.customerOrder.create({
      data: {
        username:username,
        useremail:"",
        phoneNumber:contact.toString(),
        address:address,
        pincode: pincode.toString(),
        products: parsedProducts,
        amount:Number(amount/100),
        razorpayOrderId:"razorpayOrderId",
        razorpayPaymentId:"razorpayPaymentId",
        razorpaySignature:"razorpaySignature",
        paymentStatus: "true",
        vendorId:vendoremail
      },
    });

    const currency = "INR";

    const options = {
      amount,
      currency,
      receipt: `receipt_order_${Date.now()}`,
    };

    const order = await razorpay.orders.create(options);
    console.log("Razorpay Order:", order);
    return order;

  } catch (error) {
    console.error("Order creation failed:", error);
    throw new Error("Failed to create order");
  }
}
