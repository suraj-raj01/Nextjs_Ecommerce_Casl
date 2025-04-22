
// import { NextResponse } from 'next/server';
// import { prisma } from '../../../lib/prisma';

// export async function POST(request: Request) {
//   const body = await request.json();
//   const { title, content } = body;

//   // Your insert logic here (e.g., using Prisma)
//   const newUser = await prisma.post.create({ data: { title, content } });
//   return NextResponse.json({ message: 'User created!', newUser }, { status: 201 });
// }
