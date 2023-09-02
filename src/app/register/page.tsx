import { createUser } from "../actions";

export default function Register() {
  return (
    <div>
      <form action={createUser}>
        <input type="text" name="name" placeholder="Seu nome" />
        <input type="email" name="email" placeholder="Seu email" />
        <input type="password" name="password" placeholder="Sua senha" />
        <input type="text" name="avatar" placeholder="Insira uma imagem de perfil" />

        <button type="submit">Registrar</button>
      </form>
    </div>
  )
}
