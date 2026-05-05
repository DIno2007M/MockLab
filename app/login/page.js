"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Home from "../page"

export default function LoginPage(){

 const router = useRouter()

 const [email,setEmail] = useState("")
 const [password,setPassword] = useState("")

 const handleLogin = async(e)=>{

  e.preventDefault()

  const res = await fetch("/api/login",{
   method:"POST",
   headers:{ "Content-Type":"application/json" },
   body: JSON.stringify({email,password})
  })

  const data = await res.json()

  if(res.ok){
   localStorage.setItem("user",JSON.stringify(data.user))
   router.push("/domain")
  }
  else{
   alert(data.message)
  }
 }

 return(

  <div className="relative min-h-screen">

   {/* BLURRED HOMEPAGE BACKGROUND */}
   <div className="absolute inset-0 blur-md pointer-events-none">
    <Home/>
   </div>

   {/* DARK OVERLAY */}
   <div className="absolute inset-0 bg-black/40"></div>


   {/* LOGIN CARD */}
   <div className="relative z-10 flex items-center justify-center min-h-screen">

    <form
     onSubmit={handleLogin}
     className="backdrop-blur-xl bg-white/80 p-10 rounded-3xl shadow-2xl w-96 border"
    >

     <h2 className="text-3xl font-bold text-center mb-2">
      Welcome Back
     </h2>

     <p className="text-gray-500 text-center mb-6">
      Login to continue your interview practice
     </p>

     <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e)=>setEmail(e.target.value)}
      className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400 outline-none"
      required
     />

     <input
      type="password"
      placeholder="Password"
      value={password}
      onChange={(e)=>setPassword(e.target.value)}
      className="w-full p-3 border rounded-lg mb-6 focus:ring-2 focus:ring-indigo-400 outline-none"
      required
     />

     <button
      type="submit"
      className="w-full bg-indigo-600 text-white p-3 rounded-lg
      hover:bg-indigo-700 transition"
     >
      Login
     </button>

    </form>

   </div>

  </div>
 )
}