'use server'
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import Razorpay from 'razorpay'

export async function createOrder(prevState: string,formData: FormData) {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  })


  const amount = Number(formData.get('total'))*100
  const contact = Number(formData.get("contact"))
  const address = formData.get("address") as string
  const pincode = Number(formData.get("pincode"))
  const username = formData.get("username") as string
  const useremail= formData.get("useremail") as string
  const products = formData.get("product");
  if (typeof products === 'string') {
    try {
      const parsedProducts = JSON.parse(products);
    } catch (error) {
      throw new Error("Invalid JSON format for products");
    }
  } else {
    throw new Error("Products field is missing or not a string");
  }
  const razorpayPaymentId = formData.get("razorpayPaymentId") as string
  const razorpayOrderId = formData.get("razorpayOrderId") as string
  const razorpaySignature = formData.get("razorpaySignature") as string

  console.log(formData);

  // await prisma.order.create({
  // userName:username,
  // userEmail: useremail,        
  // phoneNumber: contact,      
  // address: address,         
  // pincode: pincode,  
  // products: products, 
  // amount: amount,      
  // razorpayOrderId: razorpayOrderId,
  // razorpayPaymentId: razorpayPaymentId,
  // razorpaySignature: razorpaySignature, 
  // paymentStatus: "true"  
  // })


  const currency = 'INR'

  const options = {
    amount,
    currency,
    receipt: 'receipt_order_74394',
  }

  const order = await razorpay.orders.create(options)
  console.log(order)
  return order

}
