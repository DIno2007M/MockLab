"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

export default function LoginModal({close,openSignup}){

const router = useRouter()

const [email,setEmail] = useState("")
const [password,setPassword] = useState("")

const handleLogin = async(e)=>{

 e.preventDefault()

 const res = await fetch("/api/login",{
  method:"POST",
  headers:{ "Content-Type":"application/json" },
  body:JSON.stringify({email,password})
 })

 const data = await res.json()

 if(res.ok){
  localStorage.setItem("user",JSON.stringify(data.user))
  router.push("/domain")
 }else{
  alert(data.message)
 }
}

return(

<div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

 <form
 onSubmit={handleLogin}
 className="bg-white p-10 rounded-3xl shadow-2xl w-96 relative"
 >

 <button
 onClick={close}
 type="button"
 className="absolute top-4 right-4"
 >
 ✕
 </button>

 <h2 className="text-3xl font-bold mb-6 text-center">
 Login
 </h2>

 <input
 type="email"
 placeholder="Email"
 value={email}
 onChange={(e)=>setEmail(e.target.value)}
 className="w-full p-3 border rounded-lg mb-4"
 required
 />

 <input
 type="password"
 placeholder="Password"
 value={password}
 onChange={(e)=>setPassword(e.target.value)}
 className="w-full p-3 border rounded-lg mb-6"
 required
 />

 <button
 type="submit"
 className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700"
 >
 Login
 </button>

 <p className="text-center mt-4 text-sm">
 Don't have an account?
 <button
 type="button"
 onClick={openSignup}
 className="text-indigo-600 ml-1"
 >
 Sign up
 </button>
 </p>

 </form>

</div>

)

}