'use client'
 
import { Loader2, Plus } from 'lucide-react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
 
export function SubmitButton() {
  const { pending } = useFormStatus()
 
  return (
    <button 
      type="submit" 
      title="Criar"
      disabled={pending}
      className="rounded-full bg-purple-600 w-12 h-12 font-bold flex items-center justify-center shadow-lg hover:bg-purple-500 transition duration-300 hover:shadow-purple-600/20 disabled:opacity-70"
    >
      {!pending && <Plus />}
      {pending && <Loader2 className="animate-spin" />}
    </button>
  )
}