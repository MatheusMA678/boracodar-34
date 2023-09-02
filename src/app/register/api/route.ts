import { prisma } from "@/services/prisma";
import { hashSync } from "bcrypt";
import { NextResponse } from "next/server";
import { z } from 'zod'

const bodySchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  avatar: z.string().url().optional()
})

export async function GET(request: Request) {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      password: false,
      avatar: true
    }
  })

  return NextResponse.json(users)
}

export async function POST(request: Request) {
  const { name, email, password, avatar } = await bodySchema.parseAsync(request.body)

  try {
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashSync(password, 12),
        avatar
      }
    })

    return NextResponse.json(user)
  } catch (error) {
    return NextResponse.json(error)
  }
}