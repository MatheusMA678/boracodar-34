import { prisma } from "@/services/prisma"
import { cookies } from "next/headers"
import { createProduct } from "./actions"
import Image from "next/image"

export default async function Home() {
  const userId = cookies().get("userId")?.value

  const products = await prisma.product.findMany({
    where: {
      userId
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
          {user && (
            <div className="flex items-center gap-2">
              <strong>{user.name}</strong>
              {!user.avatar ? <Image src={user.avatar!} alt={`Avatar de ${user.name}`} width={48} height={48} /> : <div className="w-12 h-12 rounded-full bg-zinc-500" />}
            </div>
          )}
        </div>
      </header>

      <main className="py-24 mx-auto container flex flex-col gap-4 min-h-screen">
        <h1 className="text-xl font-bold text-white">Lista de Compras</h1>

        <section>
          <form action={createProduct} className="flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <label htmlFor="product" className="text-sm text-zinc-200">Produto</label>
              <input
                type="text"
                name="product"
                id="product"
                placeholder="Nome do produto"
                className="rounded-lg bg-zinc-800 shadow-xl border border-zinc-700 h-12 px-4"
              />
            </div>

            <div className="flex items-end gap-4">
              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="quantity" className="text-sm text-zinc-200">Quatidade</label>
                <input
                  type="number"
                  name="quantity"
                  id="quantity"
                  placeholder="1"
                  className="rounded-lg bg-zinc-800 shadow-xl border border-zinc-700 h-12 px-4"
                />
              </div>

              <div className="flex flex-col gap-2 flex-1">
                <label htmlFor="category" className="text-sm text-zinc-200">Categoria</label>
                <select
                  name="category"
                  id="category"
                  placeholder="Selecione..."
                  className="rounded-lg bg-zinc-800 shadow-xl border border-zinc-700 h-12 px-4"
                >
                  <option value="Fruta">Fruta</option>
                  <option value="Legume">Legume</option>
                  <option value="Objeto">Objeto</option>
                </select>
              </div>

              <button type="submit" className="rounded-full bg-purple-600 w-12 h-12 font-bold">+</button>
            </div>
          </form>
        </section>

        <section className="flex flex-col flex-1 mt-8">
          {products.length > 0 ? products.map(product => {
            return (
              <div key={product.id} className="flex items-center justify-between w-full p-4 rounded-md border border-zinc-500 gap-4">
                <input type="checkbox" name="purchased" id="purchased" defaultChecked={product.purchased!} />
                <div className="flex-1">
                  <strong>{product.product}</strong>
                  <span className="ml-2 bg-purple-500/20 rounded-md text-purple-500 p-1 font-medium text-sm">{product.category}</span>
                  <span className="font-light text-xs block">{product.quantity} UN.</span>
                </div>
              </div>
            )
          }) : (
            <div className="flex-1 flex items-center justify-center">
              <strong>Nenhum produto cadastrado ainda.</strong>
            </div>
          )}
        </section>
      </main>
    </>
  )
}
