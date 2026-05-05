"use client";

import Navbar from "./components/Navbar";
import { Mic, Brain, BarChart3 } from "lucide-react";
import { useEffect, useState } from "react";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";

export default function Home() {

  /* ---------------- STATE ---------------- */

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  /* ---------------- FETCH FEEDBACK ---------------- */

  useEffect(() => {

    const fetchFeedbacks = async () => {
      try {

        const res = await fetch("/api/feedback");
        const data = await res.json();

        const randomFeedbacks = data
          .sort(() => 0.5 - Math.random())
          .slice(0, 3);

        setFeedbacks(randomFeedbacks);

      } catch (error) {
        console.log("Error fetching feedback:", error);
      }
    };

    fetchFeedbacks();

  }, []);

  /* ---------------- UI ---------------- */

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center pt-32 px-6">

        {/* LEFT CONTENT */}
        <div className="text-center md:text-left">

          <h1 className="text-5xl font-bold leading-tight">
            Master Your Interviews with
            <span className="text-indigo-600"> MockLab AI</span>
          </h1>

          <p className="mt-6 text-gray-600 text-lg max-w-xl">
            Simulate real technical interviews, receive intelligent feedback,
            and track your improvement with MockLab AI.
          </p>

          <button
            onClick={() => setShowLogin(true)}
            className="mt-8 bg-indigo-600 text-white px-6 py-3 rounded-xl hover:scale-105 transition duration-300 shadow-lg"
          >
            Start Practicing
          </button>

        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">

          <div className="relative">

            {/* Glow Effect */}
            <div className="absolute inset-0 bg-indigo-400 blur-3xl opacity-20 rounded-full"></div>

            <img
              src="/interview.png"
              alt="Interview Illustration"
              className="relative w-[450px] md:w-[550px] rounded-2xl shadow-xl hover:scale-105 transition duration-500"
            />

          </div>

        </div>

      </section>

      {/* FEATURES SECTION */}
      <section className="max-w-6xl mx-auto mt-28 px-6">

        <h2 className="text-3xl font-bold text-center mb-12">
          Powerful Features to Boost Your Interview Skills
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {/* FEATURE 1 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <Mic className="text-indigo-600 mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-3">
              Voice-Based Interview Practice
            </h3>
            <p className="text-gray-600">
              Answer interview questions naturally using your voice,
              just like a real interview experience.
            </p>
          </div>

          {/* FEATURE 2 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <Brain className="text-indigo-600 mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-3">
              AI Powered Feedback
            </h3>
            <p className="text-gray-600">
              Get intelligent insights on clarity, accuracy, and communication
              to improve faster.
            </p>
          </div>

          {/* FEATURE 3 */}
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition duration-300">
            <BarChart3 className="text-indigo-600 mb-4" size={40} />
            <h3 className="text-xl font-semibold mb-3">
              Performance Tracking
            </h3>
            <p className="text-gray-600">
              Monitor your progress with detailed analytics and improvement
              insights.
            </p>
          </div>

        </div>

      </section>

      {/* FEEDBACK SECTION */}
      <section className="max-w-6xl mx-auto mt-28 px-6 pb-20">

        <h2 className="text-3xl font-bold text-center mb-12">
          What Users Say About MockLab AI
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {feedbacks.length > 0 ? (
            feedbacks.map((item) => (
              <div
                key={item._id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition"
              >
                <p className="text-gray-600 italic">
                  "{item.feedback}"
                </p>

                <h4 className="mt-4 font-semibold text-indigo-600">
                  {item.name}
                </h4>

              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">
              Loading feedback...
            </p>
          )}

        </div>

        {/* SUPPORT */}
        <div className="text-center mt-16">

          <h3 className="text-2xl font-semibold">
            Need Help or Want to Share Feedback?
          </h3>

          <p className="text-gray-600 mt-3">
            Your feedback helps us improve MockLab AI.
          </p>

          <a
            href="mailto:support@mocklab.ai"
            className="inline-block mt-6 px-6 py-3 bg-indigo-600 text-white rounded-xl hover:scale-105 transition"
          >
            Contact Support
          </a>

        </div>

      </section>

      {/* LOGIN MODAL */}
      {showLogin && (
        <LoginModal
          close={() => setShowLogin(false)}
          openSignup={() => {
            setShowLogin(false);
            setShowSignup(true);
          }}
        />
      )}

      {/* SIGNUP MODAL */}
      {showSignup && (
        <SignupModal
          close={() => setShowSignup(false)}
          openLogin={() => {
            setShowSignup(false);
            setShowLogin(true);
          }}
        />
      )}

    </div>
  );
}