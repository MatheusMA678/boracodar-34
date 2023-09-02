"use server"

import { prisma } from "@/services/prisma"
import { hashSync } from "bcrypt"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"
import { z } from 'zod'

const userFormSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string(),
  avatar: z.string().url().optional()
})

const productFormSchema = z.object({
  product: z.string(),
  quantity: z.number().min(1, { message: "A quantidade não deve ser menor que 1" }),
  category: z.enum(["Fruta", "Legume", "Objeto"]),
  purchased: z.boolean().optional().default(false)
})

export async function createUser(formData: FormData) {
  const userForm = await userFormSchema.parseAsync({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    avatar: formData.get("avatar") || "https://example.com/user.png",
  })

  try {
    const user = await prisma.user.create({
      data: {
        ...userForm,
        password: hashSync(userForm.password, 12)
      }
    })

    if (user) {
      cookies().set("userId", user.id)
    }
  } catch (error) {
    console.log(error)
  }

  redirect("/")
}

export async function createProduct(formData: FormData) {
  const productParsed = await productFormSchema.parseAsync({
    product: formData.get("product"),
    quantity: Number(formData.get("quantity")),
    category: formData.get("category")
  })
  const userId = cookies().get("userId")?.value

  try {
    if (userId) {
      await prisma.product.create({
        data: {
          ...productParsed,
          userId
        }
      })
    }

    revalidatePath("/")
  } catch (error) {
    console.log(error)
  }
}