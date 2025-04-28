'use server'
import Razorpay from 'razorpay'

export async function createOrder(prevState: any,formData: FormData) {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  })


  const amount = Number(formData.get('amount'))*100
  // const contact = formData.get("contact") as string
  // const address = formData.get("address") as string

  console.log(formData);

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
