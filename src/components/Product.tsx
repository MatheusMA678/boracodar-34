"use client"

import { updateProduct } from "@/app/actions"
import { Product } from "@prisma/client"
import { ChangeEvent } from "react"

interface ProductProps {
  info: Product
}

export function Product({ info }: ProductProps) {
  const handleChecked = (e: ChangeEvent<HTMLInputElement>) => {
    updateProduct({
      id: info.id
    }, {
      purchased: e.target.checked
    })
  }

  return (
    <div className="flex items-center justify-between w-full p-4 rounded-xl bg-zinc-900 border-2 border-zinc-700 gap-4">
      <input
        type="checkbox"
        name="purchased"
        id="purchased"
        defaultChecked={info.purchased!}
        onChange={handleChecked}
        className="rounded-full checked:bg-purple-600 focus:checked:bg-purple-600 hover:checked:bg-purple-500 transition cursor-pointer bg-zinc-600 w-5 h-5 outline-none focus:ring-0 peer/checkbox"
      />
      <div className="flex-1 peer-checked/checkbox:line-through peer-checked/checkbox:text-zinc-400" data-checked={info.purchased}>
        <strong>{info.product}</strong>
        <span
          data-category={info.category}
          className="
            ml-2 
            bg-purple-500/20 
            rounded-md 
            text-purple-500 
            p-1 
            font-medium 
            text-sm 
            data-[category='Legume']:bg-green-500/20
            data-[category='Legume']:text-green-500
            data-[category='Objeto']:bg-orange-500/20
            data-[category='Objeto']:text-orange-500
          "
        >
          {info.category}
        </span>
        <span className="font-light text-xs block">{info.quantity} UN.</span>
      </div>
    </div>
  )
}
