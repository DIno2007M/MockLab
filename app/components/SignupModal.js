"use client"

import { useState } from "react"

export default function SignupModal({ close, openLogin }) {

  // State Variables

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")


  // Signup Handler

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
        openLogin()   // switch to login modal

      } else {

        alert(data.message || "Signup failed")

      }

    } catch (error) {

      console.log(error)
      alert("Something went wrong")

    }

  }

  // UI

  return (

    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">

      {/* Signup Card */}
      <form
        onSubmit={handleSignup}
        className="bg-white p-10 rounded-3xl shadow-2xl w-96 relative"
      >

        {/* Close Button */}
        <button
          type="button"
          onClick={close}
          className="absolute top-4 right-4 text-gray-500 hover:text-black"
        >
          ✕
        </button>


        {/* Heading */}
        <h2 className="text-3xl font-bold text-center mb-2">
          Create Account
        </h2>

        <p className="text-gray-500 text-center mb-6">
          Start practicing AI interviews
        </p>


        {/* Name Input */}
        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400 outline-none"
          required
        />


        {/* Email Input */}
        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg mb-4 focus:ring-2 focus:ring-indigo-400 outline-none"
          required
        />


        {/* Password Input */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 border rounded-lg mb-6 focus:ring-2 focus:ring-indigo-400 outline-none"
          required
        />


        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white p-3 rounded-lg hover:bg-indigo-700 transition"
        >
          Sign Up
        </button>


        {/* Login Switch */}
        <p className="text-sm text-center mt-6 text-gray-500">

          Already have an account?

          <button
            type="button"
            onClick={openLogin}
            className="text-indigo-600 ml-1 font-medium"
          >
            Login
          </button>

        </p>

      </form>

    </div>

  )

}