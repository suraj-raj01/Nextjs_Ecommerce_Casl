'use server'

import Razorpay from 'razorpay'
import crypto from 'crypto'

export async function createOrder(formData: FormData) {
  const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID!,
    key_secret: process.env.RAZORPAY_KEY_SECRET!,
  })

  const amount = Number(formData.get('amount')) * 100 // in paise
  const currency = 'INR'

  const options = {
    amount,
    currency,
    receipt: 'receipt_order_74394',
  }

  const order = await razorpay.orders.create(options)
  return order
}
