"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Home from "../page"

export default function SignupPage() {

  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSignup = async (e) => {

    e.preventDefault()

    try {

      const res = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      })

      const data = await res.json()

      if (res.ok) {

        alert("Account created successfully")
        router.push("/login")

      } else {

        alert(data.message || "Signup failed")

      }

    } catch (error) {

      console.log(error)
      alert("Something went wrong")

    }

  }

  return (

    <div className="relative min-h-screen">

      {/* BLURRED HOMEPAGE BACKGROUND */}
      <div className="absolute inset-0 blur-md pointer-events-none">
        <Home />
      </div>

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/40"></div>


      {/* SIGNUP CARD */}
      <div className="relative z-10 flex items-center justify-center min-h-screen">

        <form
          onSubmit={handleSignup}
          className="backdrop-blur-xl bg-white/80 p-10 rounded-3xl shadow-2xl w-96 border"
        >

          <h2 className="text-3xl font-bold text-center mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 text-center mb-6">
            Start practicing AI interviews today
          </p>

          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border rounded-lg mb-6 focus:ring-2 focus:ring-indigo-400 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
          >
            Create Account
          </button>

          <p className="text-sm text-center mt-6 text-gray-500">
            Already have an account?
            <a href="/login" className="text-indigo-600 ml-1">
              Login
            </a>
          </p>

        </form>

      </div>

    </div>

  )
}