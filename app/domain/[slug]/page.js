"use client";

import { useParams, useRouter } from "next/navigation";
import Navbar from "@/app/components/Navbar";
import { ArrowLeft, Code2, Bug, Database, Users } from "lucide-react";

export default function DomainDetail() {
  const { slug } = useParams();
  const router = useRouter();

  const content = {
    coding: {
      title: "Coding Interview",
      icon: <Code2 size={40} className="text-blue-600" />,
      text: "Coding interviews evaluate your problem-solving ability, data structures knowledge, and algorithmic thinking. Focus on writing optimized code, handling edge cases, and explaining your approach clearly.",
    },
    testing: {
      title: "Testing & Debugging",
      icon: <Bug size={40} className="text-blue-600" />,
      text: "This domain focuses on identifying bugs, writing test cases, and understanding testing principles. You’ll be evaluated on logical thinking and your ability to ensure code reliability.",
    },
    core: {
      title: "Core Computer Science",
      icon: <Database size={40} className="text-blue-600" />,
      text: "Core CS includes DBMS, Operating Systems, and Computer Networks. Be strong in memory management, normalization, and networking concepts with practical understanding.",
    },
    behavioral: {
      title: "Behavioral Interview",
      icon: <Users size={40} className="text-blue-600" />,
      text: "Behavioral interviews assess communication, teamwork, and problem-solving attitude. Use real-life examples to demonstrate leadership and decision-making skills.",
    },
  };

  const data = content[slug];

  if (!data) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white text-gray-800">
        Invalid Domain
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 via-white to-blue-100 overflow-hidden">

      {/* Navbar */}
      <Navbar />

      {/* Body */}
      <div className="relative flex-1 flex items-center justify-center px-6">

        {/* Background Glow */}
        <div className="absolute top-20 left-1/3 w-96 h-96 bg-blue-400 opacity-20 blur-[120px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-blue-300 opacity-20 blur-[120px] rounded-full animate-pulse"></div>

        {/* Back Button */}
        <button
          onClick={() => router.push("/domain")}
          className="absolute top-8 left-8 flex items-center gap-2 text-blue-700 hover:text-blue-900 transition font-medium"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* Main Card */}
        <div className="relative z-10 max-w-3xl w-full">

          <div className="group bg-white/60 backdrop-blur-xl border border-blue-100 rounded-3xl p-12 shadow-xl hover:shadow-2xl transition-all duration-500 text-center">

            {/* Icon */}
            <div className="flex justify-center mb-6">
              <div className="bg-blue-100 p-4 rounded-2xl group-hover:scale-110 transition">
                {data.icon}
              </div>
            </div>

            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-800 mb-6">
              {data.title}
            </h1>

            {/* Description */}
            <p className="text-gray-600 text-lg leading-relaxed max-w-xl mx-auto">
              {data.text}
            </p>

            {/* CTA */}
            <button
              onClick={() => router.push("/interview")}
              className="mt-10 px-10 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white font-semibold shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
            >
              Start Interview Practice
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}