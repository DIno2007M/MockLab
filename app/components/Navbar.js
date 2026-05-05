"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"

export default function Navbar() {

  const router = useRouter()
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = localStorage.getItem("user")

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem("user")
    setUser(null)
    router.push("/")
  }

  return (

    <nav className="w-full flex justify-between items-center px-8 py-4 bg-white shadow-md">

      {/* Logo */}
      <h1
        onClick={() => router.push("/")}
        className="text-xl font-bold cursor-pointer"
      >
        MockLab AI
      </h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">

        {user ? (

          <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-blue-400 text-white px-4 py-2 rounded-lg hover:bg-blue-500 transition"
          >
            <LogOut size={18} />
            
          </button>

        ) : (

          <>
            <button
              onClick={() => router.push("/login")}
              className="border px-4 py-2 rounded-lg hover:bg-gray-100 transition"
            >
              Login
            </button>

            <button
              onClick={() => router.push("/signup")}
              className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition"
            >
              Signup
            </button>
          </>

        )}

      </div>

    </nav>
  )
}