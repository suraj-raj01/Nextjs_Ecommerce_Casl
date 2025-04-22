'use server';
import {prisma} from '../../lib/prisma'
// const prisma = new PrismaClient();

export async function productData(prevState: any, formData: FormData) {
  const product = formData.get('product') as string
  const price = Number(formData.get('price'));
  const details = formData.get('details') as string
  console.log(formData);
  if (!product || !price || !details) {
    return { error: 'All fields are required' };
  }
  try {
    const products = await prisma.product.create({ 
        data: {product, price, details}
    })
    
  } catch (error) {
    console.error('Error registering user:', error);
    return { error: 'Failed to register user' };
  }
}