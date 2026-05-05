"use client";

import { useRouter } from "next/navigation";
import Navbar from "../components/Navbar";
import { Code, Bug, Cpu, Users } from "lucide-react";

export default function DomainPage() {

  const router = useRouter();

  const domains = [
    {
      title: "Coding",
      desc: "DSA & problem solving",
      slug: "coding",
      icon: Code,
    },
    {
      title: "Testing & Debugging",
      desc: "Bug fixing & testing concepts",
      slug: "testing",
      icon: Bug,
    },
    {
      title: "Core CS",
      desc: "DBMS, OS, Networks",
      slug: "core",
      icon: Cpu,
    },
    {
      title: "Behavioral",
      desc: "HR & personality",
      slug: "behavioral",
      icon: Users,
    },
  ];

  return (

    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">

      {/* Navbar */}
      <Navbar />

      <div className="max-w-6xl mx-auto px-6 py-20">

        {/* <div className="text-center mb-16">

          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Choose Your Interview Domain
          </h1>

          <p className="text-gray-500 text-lg">
            Select a domain to start your mock interview preparation
          </p>

        </div> */}/

        {/* Heading Section */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-block mb-4 px-4 py-1 text-sm font-medium bg-blue-100 text-blue-600 rounded-full">
            AI Powered Practice
          </div>
          
          {/* Main Heading */}
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
            Choose Your{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              Interview Domain
            </span>
          </h1>
          
          {/* Subtitle */}
          
          <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
            Select a domain and start practicing AI-powered mock interviews to improve your technical and behavioral skills.
          </p>
          
          {/* Divider */}
          <div className="mt-8 flex justify-center">
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"></div>
          </div>
        </div>

        {/* Domain Cards */}
        <div className="grid md:grid-cols-2 gap-10">

          {domains.map((domain) => {

            const Icon = domain.icon;

            return (

              <div
                key={domain.slug}
                onClick={() => router.push(`/domain/${domain.slug}`)}
                className="group cursor-pointer relative p-8 rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition duration-300 hover:-translate-y-1"
              >

                {/* Gradient Glow */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-500 opacity-0 group-hover:opacity-10 transition"></div>

                {/* Icon */}
                <div className="mb-5 flex items-center justify-center w-14 h-14 rounded-xl bg-blue-100 text-blue-600">
                  <Icon size={28} />
                </div>

                {/* Title */}
                <h2 className="text-2xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition">
                  {domain.title}
                </h2>

                {/* Description */}
                <p className="text-gray-500">
                  {domain.desc}
                </p>

              </div>

            );

          })}

        </div>

      </div>

    </div>

  );
}