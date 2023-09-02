import { prisma } from "@/services/prisma";
import { NextResponse } from "next/server";
import { z } from 'zod'
import { cookies } from 'next/headers' 

const bodySchema = z.object({
  product: z.string(),
  quantity: z.number().min(1, { message: "A quantidade não deve ser menor que 1" }),
  category: z.enum(["fruit", "vegetal", "beef"])
})

export async function GET(request: Request) {
  return NextResponse.json({ message: "funcionando" })
}

export async function POST(request: Request) {
  const { product, category, quantity } = await bodySchema.parseAsync(request.body)
  const userId = cookies().get("userId")?.value

  try {
    if (userId) {
      await prisma.product.create({
        data: {
          product,
          category,
          quantity,
          userId
        }
      })
    }
  } catch (error) {
    return NextResponse.json(error)
  }
}