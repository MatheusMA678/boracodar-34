import { prisma } from "@/services/prisma"
import { cookies } from "next/headers"
import { createProduct } from "./actions"
import Image from "next/image"
import { redirect } from "next/navigation"
import { Plus } from "lucide-react"
import { Product } from "@/components/Product"
import { Suspense } from "react"
import { SubmitButton } from "@/components/SubmitButton"

export default async function Home() {
  const userId = cookies().get("userId")?.value

  if (!userId) {
    return redirect('/register')
  }

  const products = await prisma.product.findMany({
    where: {
      userId
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const user = await prisma.user.findUnique({
    where: {
      id: userId
    }
  })

  return (
    <>
      <header className="absolute top-0 inset-x-0 -z-10">
        <div className="w-full h-48 bg-zinc-900 p-8 flex justify-end items-start">
          {/* {user && (
            <div className="flex items-center gap-2">
              <strong>{user.name}</strong>
              {!user.avatar ? <Image src={user.avatar!} alt={`Avatar de ${user.name}`} width={48} height={48} /> : <div className="w-12 h-12 rounded-full bg-zinc-500" />}
            </div>
          )} */}
        </div>
      </header>

      <main className="pt-24 p-4 w-full max-w-3xl mx-auto flex flex-col gap-4 h-screen">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-bold text-white font-alt">
            Lista de Compras
          </h1>
          {products.length > 0 && (
            <span className="text-base font-bold bg-zinc-700 rounded-full px-3 py-1">
              {products.length} produtos
            </span>
          )}
        </div>

        <section>
          <form action={createProduct} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="product" className="text-sm text-zinc-200">Produto</label>
              <input
                type="text"
                name="product"
                id="product"
                required
                list="list"
                placeholder="ex.: Banana"
                className="rounded-lg bg-zinc-800 shadow-xl border border-zinc-700 h-12 px-4"
              />
              <datalist id="list">
                <option value="Banana">Banana</option>
                <option value="Maçã">Maçã</option>
                <option value="Pera">Pera</option>
              </datalist>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex flex-col-reverse gap-2 flex-1">
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  placeholder="ex.: 1"
                  defaultValue={1}
                  required
                  className="rounded-lg bg-zinc-800 shadow-xl border border-zinc-700 h-12 px-4 peer/input"
                />
                <label htmlFor="quantity" className="text-sm text-zinc-200 peer-required/input:after:content-['*'] after:ml-1 after:text-red-500">Quatidade</label>
              </div>

              <div className="flex items-end gap-4 flex-1">
                <div className="flex flex-col gap-2 flex-1">
                  <label htmlFor="category" className="text-sm text-zinc-200">Categoria</label>
                  <select
                    name="category"
                    id="category"
                    placeholder="Selecione..."
                    required
                    className="rounded-lg bg-zinc-800 shadow-xl border border-zinc-700 h-12 px-4 appearance-none"
                  >
                    <option value="Fruta">Fruta</option>
                    <option value="Legume">Legume</option>
                    <option value="Objeto">Objeto</option>
                  </select>
                </div>

                <SubmitButton />
              </div>
            </div>
          </form>
        </section>

        <section className="flex flex-col flex-1 mt-8 gap-4 overflow-y-auto">
          {products.length > 0 ? products.map(product => (
            <Suspense key={product.id} fallback={<p>Loading...</p>}>
              <Product info={product} />
            </Suspense>
          )) : (
            <div className="flex-1 flex items-center justify-center">
              <strong>Nenhum produto cadastrado ainda.</strong>
            </div>
          )}
        </section>
      </main>
    </>
  )
}
