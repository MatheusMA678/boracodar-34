import { InputHTMLAttributes } from "react";
import { createUser } from "../actions";
import Link from "next/link";

export default function Register() {
  return (
    <div className="flex items-center justify-center h-screen">
      <form action={createUser} className="flex flex-col gap-4 w-full max-w-lg p-4 sm:p-6">

        <h1 className="font-bold text-4xl font-alt">Criar uma conta</h1>

        <Input label="Nome" id="name" name="name" type="text" placeholder="Digite seu nome" />
        <Input label="E-mail" id="email" name="email" type="email" placeholder="Digite seu email" />
        <Input label="Senha" id="password" name="password" type="password" placeholder="••••" />
        <Input label="URL do Avatar" id="avatar" name="avatar" type="text" placeholder="ex.: https://exemplo.com/imagem.png" />

        <div className="flex items-center justify-between">
          <Link href={"/"} className="text-xs font-medium text-zinc-300 hover:underline">
            Já possui uma conta?
          </Link>

          <button type="submit" className="px-4 py-2 bg-purple-600 rounded-md font-semibold text-sm duration-300 ease-in-out transition shadow-lg hover:bg-purple-500 hover:shadow-lg hover:shadow-purple-700/20 focus:outline-none border-2 border-transparent focus:border-zinc-100">Registrar</button>
        </div>
      </form>
    </div>
  )
}

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
}

function Input({ label, required, ...rest }: InputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={rest.id} className="text-sm font-medium text-zinc-200">{label}</label>
      <input {...rest} className="flex px-4 bg-zinc-800 border-2 border-zinc-600 rounded-lg h-12 focus:outline-none focus:border-purple-600 transition duration-300" />
    </div>
  )
}
