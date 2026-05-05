"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Mic, Clock, ArrowRight } from "lucide-react";

import Navbar from "../components/Navbar";
import { questionsDB } from "../data/questions";

export default function InterviewPage() {

  /*  PARAMS */

  const searchParams = useSearchParams();
  const domain = searchParams.get("domain");
  const questions = questionsDB[domain] || [];

  /* state */

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [question, setQuestion] = useState("");
  const [userAnswer, setUserAnswer] = useState("");
  const [answers, setAnswers] = useState([]);

  const [timeLeft, setTimeLeft] = useState(0); // ⛔ start at 0
  const [interviewFinished, setInterviewFinished] = useState(false);

  const [isRecording, setIsRecording] = useState(false);
  const [recognition, setRecognition] = useState(null);

  const [isSpeaking, setIsSpeaking] = useState(false);
  const [canAnswer, setCanAnswer] = useState(false);
  

  useEffect(() => {

    if (!canAnswer) return; // ⛔ only run after speaking ends

    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);

  }, [timeLeft, canAnswer]);

  /* speech to text */

  const startRecording = () => {

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Speech Recognition not supported");
      return;
    }

    const recog = new SpeechRecognition();

    recog.continuous = true;
    recog.interimResults = true;

    recog.onstart = () => setIsRecording(true);

    recog.onresult = (event) => {
      let text = "";

      for (let i = event.resultIndex; i < event.results.length; i++) {
        text += event.results[i][0].transcript;
      }

      setUserAnswer(text);
    };

    recog.onend = () => setIsRecording(false);

    recog.start();
    setRecognition(recog);
  };

  const stopRecording = () => {
    if (recognition) recognition.stop();
    setIsRecording(false);
  };

  /* text to speech */

  const speakQuestion = (text) => {

    if (!window.speechSynthesis) return;

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";
    speech.rate = 0.9;

    speech.onstart = () => {
      setIsSpeaking(true);
      setCanAnswer(false); // ❌ disable input
    };

    speech.onend = () => {
      setIsSpeaking(false);
      setCanAnswer(true);  // ✅ enable input
      setTimeLeft(120);    // ⏱️ start timer AFTER speaking
    };

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    return () => {
      window.speechSynthesis.cancel();
    };
  }, []);

  /* handlers */

  const handleStartInterview = () => {

    if (questions.length > 0) {

      const firstQ = questions[0];

      setCurrentQuestion(0);
      setQuestion(firstQ);
      setUserAnswer("");

      speakQuestion(firstQ);
    }
  };

  const handleNextQuestion = () => {

    if (currentQuestion < questions.length - 1) {

      const nextIndex = currentQuestion + 1;
      const nextQ = questions[nextIndex];

      setCurrentQuestion(nextIndex);
      setQuestion(nextQ);
      setUserAnswer("");
      setTimeLeft(0);

      speakQuestion(nextQ);

    } else {
      setInterviewFinished(true);
    }
  };

  const handleSubmitAnswer = () => {

    if (!userAnswer.trim()) return;

    setAnswers([...answers, userAnswer]);
    setUserAnswer("");
  };

  /* timer format */

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  /* interview finished */

  if (interviewFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-blue-50">
        <div className="bg-white p-10 rounded-2xl shadow-xl w-[700px]">

          <h1 className="text-3xl font-bold text-center mb-6">
            Interview Completed!
          </h1>

          {answers.map((ans, i) => (
            <div key={i} className="bg-gray-100 p-3 rounded mb-3">
              {ans}
            </div>
          ))}

          <button
            onClick={() => window.location.reload()}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl"
          >
            Restart
          </button>

        </div>
      </div>
    );
  }

  /* ui */

  return (

    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100">

      <Navbar />

      <div className="p-10">

        {/* HEADER */}
        <div className="bg-white p-6 rounded-xl shadow mb-10 flex justify-between">

          <div>
            <h1 className="text-3xl font-bold">AI Interview Simulator</h1>
            <p className="text-gray-500">
              Practice, analyze, and improve your interview performance
            </p>
          </div>

          <div className="flex items-center gap-2 bg-blue-50 px-4 py-2 rounded-xl">
            <Clock />
            <span className="font-semibold text-blue-700">
              {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </span>
          </div>

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 gap-10">

          {/* QUESTION */}
          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-lg font-semibold mb-4">
              Interview Question
            </h2>

            <div className="bg-blue-50 p-4 rounded min-h-[120px]">
              {question || "Click Start Interview"}
            </div>

            <button
              onClick={question ? handleNextQuestion : handleStartInterview}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl flex justify-center items-center gap-2"
            >
              {question ? "Next Question" : "Start Interview"}
              <ArrowRight size={18} />
            </button>

          </div>

          {/* ANSWER */}
          <div className="bg-white p-6 rounded-xl shadow">

            <h2 className="text-lg font-semibold mb-4">
              Your Answer
            </h2>

            {/* VOICE BUTTON */}
            <button
              disabled={!canAnswer}
              onClick={isRecording ? stopRecording : startRecording}
              className={`w-full py-3 rounded-xl text-white mb-4 transition 
              ${isRecording ? "bg-red-500" : "bg-blue-600"}
              ${!canAnswer && "opacity-50 cursor-not-allowed"}`}
            >
              {isRecording ? "Stop Recording" : "Start Recording"}
            </button>

            {/* TEXTAREA */}
            <textarea
              disabled={!canAnswer}
              value={userAnswer}
              onChange={(e) => setUserAnswer(e.target.value)}
              placeholder={
                isSpeaking
                  ? "Listening to question..."
                  : "Speak or type your answer..."
              }
              rows="5"
              className="w-full border p-3 rounded"
            />

            {/* SUBMIT */}
            <button
              disabled={!canAnswer}
              onClick={handleSubmitAnswer}
              className="mt-4 w-full bg-blue-600 text-white py-3 rounded-xl disabled:opacity-50"
            >
              Submit Answer
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}